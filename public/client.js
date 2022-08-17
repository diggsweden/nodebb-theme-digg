/*
Hey there!

This is the client file for your theme. If you need to do any client-side work in javascript,
this is where it needs to go.

You can listen for page changes by writing something like this:

  $(window).on('action:ajaxify.end', function(data) {
    var	url = data.url;
    console.log('I am now at: ' + url);
  });
*/

("use strict");

require(["digg_tabbing"], (tabbing) => {
  $(document).ready(function () {
    $(window).on("action:ajaxify.end", function (event, data) {
      if (data.title === "[[pages:home]]") {
        $(".digg-image").show();
        $(".digg-divider").hide();
      } else {
        $(".digg-image").hide();
        $(".digg-divider").show();
      }

      tabbing.init();

      $(".filter-focus").each((i, button) => {
        if (window.location.href.indexOf("focusMenu=" + i) > -1) {
          button.focus();
        }
      });

      Array.from($(".user-list-menu").children()).forEach((li, i) => {
        if (window.location.href.indexOf("focusMenu=" + i) > -1) {
          li.children[0].focus();
        }
      });

      tabbing.setUserListMenuFocus();
      //dropdown focus fix
      tabbing.setFilterFocus();
      $("#categoryButton").on("click", () => {
        setTimeout(() => {
          setFilterFocus("category");
        }, 500);
      });
    });
  });
});

define("forum/register", [
  "translator",
  "zxcvbn",
  "slugify",
  "api",
  "bootbox",
  "forum/login",
  "jquery-form",
], function (translator, zxcvbn, slugify, api, bootbox, Login) {
  const Register = {};
  let validationError = false;
  const successIcon = "";

  Register.init = function () {
    const email = $("#email");
    const email_validate = $("#email-validate");
    const username = $("#username");
    const firstName = $("#firstName");
    const password = $("#password");
    const password_confirm = $("#password-confirm");
    const register = $("#register");

    handleLanguageOverride();

    $("#content #noscript").val("false");

    const query = utils.params();
    if (query.token) {
      $("#token").val(query.token);
    }

    email.on("blur", function () {
      if (email.val().length) {
        validateEmail(email.val());
      }
    });

    firstName.on("blur", function () {
      if (firstName.val().length) {
        validateFirstName(firstName.val());
      }
    });

    // Update the "others can mention you via" text
    username.on("keyup", function () {
      $("#yourUsername").text(
        this.value.length > 0 ? slugify(this.value) : "username"
      );
    });

    username.on("blur", function () {
      if (username.val().length) {
        validateUsername(username.val());
      }
    });

    password.on("blur", function () {
      if (password.val().length) {
        validatePassword(password.val(), password_confirm.val());
      }
    });

    password_confirm.on("blur", function () {
      if (password_confirm.val().length) {
        validatePasswordConfirm(password.val(), password_confirm.val());
      }
    });

    function validateForm(callback) {
      validationError = false;
      validatePassword(password.val(), password_confirm.val());
      validatePasswordConfirm(password.val(), password_confirm.val());
      validateUsername(username.val());
      validateEmail(email.val());
      validateEmailValidate(email_validate.val());
      validateFirstName(firstName.val());
      callback();
    }

    // Guard against caps lock
    Login.capsLockCheck(
      document.querySelector("#password"),
      document.querySelector("#caps-lock-warning")
    );

    register.on("click", function (e) {
      e.preventDefault();
      const registerBtn = $(this);
      const errorEl = $("#register-error-notify");
      errorEl.addClass("hidden");
      validateForm(function () {
        if (!validationError) {
          registerBtn.addClass("disabled");
          registerBtn.parents("form").ajaxSubmit({
            headers: {
              "x-csrf-token": config.csrf_token,
            },
            success: function (data) {
              registerBtn.removeClass("disabled");
              if (!data) {
                return;
              }
              if (data.next) {
                const pathname = utils.urlToLocation(data.next).pathname;

                const params = utils.params({ url: data.next });
                params.registered = true;
                const qs = decodeURIComponent($.param(params));

                window.location.href = pathname + "?" + qs;
              } else if (data.message) {
                translator.translate(data.message, function (msg) {
                  bootbox.alert(msg);
                  ajaxify.go("/");
                });
              }
            },
            error: function (data) {
              translator.translate(
                data.responseText,
                config.defaultLang,
                function (translated) {
                  if (
                    data.status === 403 &&
                    data.responseText === "Forbidden"
                  ) {
                    window.location.href =
                      config.relative_path + "/register?error=csrf-invalid";
                  } else {
                    errorEl.find("p").text(translated);
                    errorEl.removeClass("hidden");
                    registerBtn.removeClass("disabled");
                  }
                }
              );
            },
          });
        }
        return false;
      });
    });

    // Set initial focus
    $("#email").focus();
  };
  function validateFirstName(firstName) {
    const firstName_notify = $("#firstName-notify");
    if (firstName == "jagArManniska") {
      showSuccess(firstName_notify, successIcon);
    } else {
      showError(firstName_notify, "");
    }
  }

  function validateEmailValidate(email) {
    const email_validate_notify = $("#email-validate-notify");
    if (email == "") {
      showSuccess(email_validate_notify, successIcon);
    } else {
      showError(email_validate_notify, "ERROR validation email not valid");
    }
  }

  function validateEmail(email) {
    const email_notify = $("#email-notify");
    // const emailslug = slugify(email);
    var emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email
    );

    if (!emailIsValid) {
      showError(email_notify, "[[error:invalid-email]]");
    } else {
      showSuccess(email_notify, successIcon);
    }
  }

  function validateUsername(username) {
    const username_notify = $("#username-notify");
    const userslug = slugify(username);
    if (
      username.length < ajaxify.data.minimumUsernameLength ||
      userslug.length < ajaxify.data.minimumUsernameLength
    ) {
      showError(username_notify, "[[error:username-too-short]]");
    } else if (username.length > ajaxify.data.maximumUsernameLength) {
      showError(username_notify, "[[error:username-too-long]]");
    } else if (!utils.isUserNameValid(username) || !userslug) {
      showError(username_notify, "[[error:invalid-username]]");
    } else {
      Promise.allSettled([
        api.head(`/users/bySlug/${username}`, {}),
        api.head(`/groups/${username}`, {}),
      ]).then((results) => {
        if (results.every((obj) => obj.status === "rejected")) {
          showSuccess(username_notify, successIcon);
        } else {
          showError(username_notify, "[[error:username-taken]]");
        }
      });
    }
  }

  function validatePassword(password, password_confirm) {
    const password_notify = $("#password-notify");
    const password_confirm_notify = $("#password-confirm-notify");
    const passwordStrength = zxcvbn(password);

    if (password.length < ajaxify.data.minimumPasswordLength) {
      showError(password_notify, "[[reset_password:password_too_short]]");
    } else if (password.length > 512) {
      showError(password_notify, "[[error:password-too-long]]");
    } else if (!utils.isPasswordValid(password)) {
      showError(password_notify, "[[user:change_password_error]]");
    } else if (password === $("#username").val()) {
      showError(password_notify, "[[user:password_same_as_username]]");
    } else if (passwordStrength.score < ajaxify.data.minimumPasswordStrength) {
      showError(password_notify, "[[user:weak_password]]");
    } else {
      showSuccess(password_notify, successIcon);
    }

    if (password !== password_confirm && password_confirm !== "") {
      showError(
        password_confirm_notify,
        "[[user:change_password_error_match]]"
      );
    }
  }

  function validatePasswordConfirm(password, password_confirm) {
    const password_notify = $("#password-notify");
    const password_confirm_notify = $("#password-confirm-notify");

    if (!password || password_notify.hasClass("alert-error")) {
      return;
    }

    if (password !== password_confirm) {
      showError(
        password_confirm_notify,
        "[[user:change_password_error_match]]"
      );
    } else {
      showSuccess(password_confirm_notify, successIcon);
    }
  }

  function showError(element, msg) {
    translator.translate(msg, function (msg) {
      element.html(msg);
      element
        .parent()
        .removeClass("register-success")
        .addClass("register-danger");
      element.show();
    });
    validationError = true;
  }

  function showSuccess(element, msg) {
    translator.translate(msg, function (msg) {
      element.html(msg);
      element
        .parent()
        .removeClass("register-danger")
        .addClass("register-success");
      element.show();
    });
  }

  function handleLanguageOverride() {
    if (!app.user.uid && config.defaultLang !== config.userLang) {
      const formEl = $('[component="register/local"]');
      const langEl = $(
        '<input type="hidden" name="userLang" value="' +
          config.userLang +
          '" />'
      );

      formEl.append(langEl);
    }
  }

  return Register;
});
