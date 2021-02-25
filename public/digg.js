const focusableElements = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';

// Skips all menu items and sets focus on first focusable element in main
$('.skip-to-content').on('click', function (event) {
    event.preventDefault();

    let content = $('#content');

    if (!content) content = $('main');
    if (!content) return;

    const focusable = $(focusableElements, content);

    const first = focusable[0];

    if (first) {
        first.focus();
    }
});

// Make mobile menu visible when clicked, and trap focus
$('#mobile-menu').on('click', function (event) {
    const menu = $('#menu');
    menu.css('display', `${"block"}`);
    trapFocus(menu[0]);
    skipToElement($('.menu-profile'), true);
});

// Make mobile chats visible when clicked, and trap focus
$('#mobile-chats').on('click', function (event) {
    const chats = $('#chats-menu');
    chats.css('display', `${"block"}`);
    trapFocus(chats[0]);
    skipToElement($('.menu-section-title', chats), true);
});

// Make the user menu accessible with enter key and traps focus
$('#user_label').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        $('#user_dropdown').click();
        const userControls = $('#user-control-list');
        trapFocus(userControls[0]);
        skipToElement(userControls[0].querySelectorAll(focusableElements));
    }
});

/**
 * Fix so you cannot tab inside mobile menus in desktop
 */
function setDisplayOnMobileMenus() {
    const menuOpen = $('html').hasClass('slideout-open');
    $('#menu').css('display', `${!menuOpen ? "none" : "block"}`);
    $('#chats-menu').css('display', `${!menuOpen ? "none" : "block"}`);
}

function skipToElement(element, setTabIndex = false) {
    setTabIndex && element.attr('tabindex', '-1');
    element[0] && element[0].focus();
}


function clickOutside(element) {
    const parent = element.parentElement;
    parent ? parent.click() : console.log('click outside failed');
    parent && setTimeout(() => {
        setDisplayOnMobileMenus();
    }, 250);
}

/**
 * Makes tabbing only cycle between focusable elements
 * in the selected element
 *
 * @param {*} element trap focus here
 */
function trapFocus(element) {
    const focusable = element.querySelectorAll(focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    const KEYCODE_TAB = 9;
    const KEYCODE_ESCAPE = 27;

    element.addEventListener('keydown', function (e) {
        const tabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
        const escapePressed = (e.key === 'Escape' || e.keyCode === KEYCODE_ESCAPE);

        escapePressed && clickOutside(element);

        if (!tabPressed) {
            return;
        }

        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

setDisplayOnMobileMenus();