/**
 * Makes tabbing accessible across the site
 * 
 * *Tip! Install https://marketplace.visualstudio.com/items?itemName=maptz.regionfolder
 * *for folding regions of code since this file contains lots of code
 *
 * ?Also useful: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments
 */

define([], () => {
    "use-strict";
    return () => {

        require(["utils"], utils => {

            /* #region variables */
            const focusableElements = 'a[href]:not([disabled]):not(.hidden), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
            const userControls = $('#user-control-list');
            const paths = location.pathname;
            /* #endregion */

            /* #region conditions */

            // Skip to post if endPath is a number
            if (paths.includes("topic")) {
                const endPath = paths[paths.length - 1];
                if (utils.isNumeric(endPath)) {
                    const i = parseInt(endPath) - 1;
                    const post = $(`[data-index="${i}"`);
                    post.find(focusableElements)[0]?.focus();
                }
            }
            /* #endregion */

            /* #region DOM-callers */

            // Skips all menu items and sets focus on first focusable element in main
            $('.skip-to-content').on('click', ev => {
                ev.preventDefault();
                skipToContent();
            });

            // Make mobile menu visible when clicked, and trap focus
            $('#mobile-menu').on('click', ev => {
                const menu = $('#menu'); // mobile menu
                menu.css('display', `${"block"}`);
                trapFocus(menu[0]);
                skipToElement($('.menu-profile'), true);

                $(".slideout-panel").on("click", e => {
                    setTimeout(() => {
                        setDisplayOnMobileMenus();
                    }, 500);
                });
            });

            // Make mobile chats visible when clicked, and trap focus
            $('#mobile-chats').on('click', ev => {
                const chats = $('#chats-menu');
                chats.css('display', `${"block"}`);
                trapFocus(chats[0]);
                skipToElement($('.menu-section-title', chats), true);
            });

            // Make the user menu accessible with enter key and traps focus
            $('#user_label').keypress(e => {
                const key = e.which;
                if (key == 13)  // the enter key code
                {
                    $('#user_dropdown').click();
                    skipToElement(userControls[0].querySelectorAll(focusableElements));
                }
                $('#user_label').unbind();
            });

            // Trap focus in modal
            $("#deleteAccountBtn").on("click", e => {
                handleModal(e.currentTarget);
            });

            $("#dropupPaginatorClose").on("click", () => {
                $("#dropupPaginator").removeClass("open");
                $("#dropupPaginatorToggle").focus();
                $("#dropupPaginatorToggle").attr("aria-expanded", false);
            });

            // Make new-topic button accessible with enter key
            $("#new_topic").keypress(e => {
                var key = e.which;
                if (key == 13)  // the enter key code
                {
                    $("#new_topic").click();
                }
            });

            $("#postToolsTrigger").on("click", () => {
                SetHandlers();
            })

            // Force a display reset on menu if its closed with click outside
            $('main').on('click', ev => {
                $('html').hasClass('slideout-open') && clickOutside($('#menu')[0]);
            });

            // Handle composer when new-topic button is pressed
            $("#new_topic").on("click", e => {
                handleComposer(e.currentTarget);
            })

            // Trap focus and handle both panels and modals
            $("#thread_tools_button").on("click", e => {
                setTimeout(() => {
                    const threadTools = $("#thread_tools");
                    const threadModalTriggers = threadTools.find("a[component='topic/move'], a[component='topic/delete'], a[component='topic/pin']");
                    const threadPanelTriggers = threadTools.find("a[component='topic/fork'], a[component='topic/move-posts'], a[component='topic/delete/posts']")
                    threadModalTriggers.each((i, el) => {
                        $(el).on("click", e => {
                            handleModal();
                        })
                    })
                    threadPanelTriggers.each((i, el) => {
                        $(el).on("click", e => {
                            handlePanel(e.currentTarget);
                        })
                    })
                }, 200);
            })

            // Trap focus and handle both panels and modals
            $("#post_tools_button").on("click", e => {
                setTimeout(() => {
                    const postTools = $("#post_tools");
                    const postModalTriggers = postTools.find("a[component='post/delete'], a[component='post/view-history'], a[component='post/flag']");
                    const postPanelTriggers = postTools.find("a[component='post/change-owner']")
                    const postComposerTriggers = postTools.find("a[component='post/edit']")
                    const focusable = postTools.find("a:not(.hidden)");
                    trapFocus(postTools[0], focusable);

                    focusable.each((i, el) => {
                        el.tabIndex = 0;
                    })
                    postModalTriggers.each((i, el) => {
                        $(el).on("click", e => {
                            handleModal();
                        })
                    })
                    postPanelTriggers.each((i, el) => {
                        $(el).on("click", e => {
                            handlePanel(e.currentTarget);
                        })
                    })
                    postComposerTriggers.each((i, el) => {
                        $(el).on("click", e => {
                            handleComposer(e.currentTarget);
                        })
                    })
                }, 200);
            })

            /* #endregion */

            /* #region functions */

            /**
             * Skips to the first focuable element in the main section
             */
            function skipToContent() {
                let content = $('#content');

                if (!content) content = $('main');
                if (!content) return;

                const focusable = $(focusableElements, content);

                const first = focusable[0];

                if (first) {
                    first.focus();
                }
            }

            /**
             * Make tabbing accessible in the composer
             */
            function handleComposer(referrer) {
                setTimeout(() => { // Timeout effects are used to wait for components to mount
                    const composer = $("[component=composer]");
                    if (!composer[0]) {
                        return;
                    }

                    setTimeout(() => {
                        const focusable = composer.find('button:not(.btn-sm), textarea, input[type="text"]:not(".tags")');
                        const dropDown = composer.find('.dropdown-toggle');
                        const input = composer.find('.title, .write, .ui-autocomplete-input');
                        const discard = $('.composer-discard');

                        // Make the helptext in the editor tabbable
                        const help = composer.find(".help");
                        if (help[0]) {
                            help[0].tabIndex = 0;
                            $(help).keypress(e => {
                                var key = e.which;
                                if (key == 13)  // the enter key code
                                {
                                    $(help).click();
                                }
                            })
                            $(help).on("click", e => {
                                handleModal(e.currentTarget);
                            })
                        }

                        // Trap focus inside the composer
                        trapFocus(composer[0], focusable);
                        focusable.each((i, el) => {
                            el.tabIndex = 0;
                        })

                        // Fix issue that the body-element is focus when escape is pressed on input-fields
                        input.each((i, el) => {
                            $(el).on("keydown blur", e => {
                                setTimeout(() => {
                                    const isBodyActive = document.activeElement.tagName == "BODY";
                                    isBodyActive && discard.focus();
                                }, 10);
                            })
                        })

                        // handle modal if "are you sure"-dialog opens
                        discard.on("click", () => {
                            handleModal();
                        })

                        focusable.on("click", () => {
                            onComposerClose(referrer);
                        })

                        // Make the category-dropdown menu accessible with tabbing
                        makeDropDownTabbable(dropDown, composer, $("#new_topic")[0])
                    }, 100);
                }, 200);
            }


            /**
             * Makes clickable elements accessible with enter key
             */
            function clickOnEnterPress(el) {
                $(el).keypress(e => {
                    if (e.which == 13) {
                        el.click();
                    }
                })
            }

            /**
             * Fix so you cannot tab inside mobile menus in desktop
             */
            function setDisplayOnMobileMenus() {
                const menuOpen = $('html').hasClass('slideout-open');
                $('#menu').css('display', `${!menuOpen ? "none" : "block"}`);
                $('#chats-menu').css('display', `${!menuOpen ? "none" : "block"}`);
            }


            /**
             * Sets focus on the selected element
             *
             * @param {*} element focus this element
             * @param {boolean} [setTabIndex=false] set to true if element does not have tabindex
             */
            function skipToElement(element, setTabIndex = false) {
                setTabIndex && element.attr('tabindex', '-1');
                element[0] && element[0].focus();
            }

            /**
             * Programatically click on the parent of a given element
             *
             * @param {*} element click the parent of this element
             */
            function clickOutside(element, nextToFocus, skipToMainContent) {
                const parent = element.parentElement;
                parent ? parent.click() : console.log('click outside failed');
                nextToFocus && nextToFocus.focus();
                skipToMainContent && skipToContent();
            }

            /**
             * Makes tabbing only cycle between focusable elements
             * in the selected element
             *
             * @param {*} element trap focus here
             */
            function trapFocus(element, focusableEl, nextToFocus, skipToMainContent) {
                const focusable = focusableEl ? focusableEl : element.querySelectorAll(focusableElements);
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                const secondToLast = focusable[focusable.length - 2];
                const thirdToLast = focusable[focusable.length - 3];
                const KEYCODE_TAB = 9;
                const KEYCODE_ESCAPE = 27;

                element.addEventListener('keydown', e => {
                    const tabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
                    const escapePressed = (e.key === 'Escape' || e.keyCode === KEYCODE_ESCAPE);

                    escapePressed && clickOutside(element, nextToFocus, skipToMainContent);

                    if (!tabPressed) {
                        return;
                    }

                    if (e.shiftKey) /* shift + tab */ {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                        if (document.activeElement.tabIndex == "-1") {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusable ||
                            (lastFocusable?.disabled && document.activeElement === secondToLast) ||
                            (lastFocusable?.disabled && secondToLast?.disabled && document.activeElement === thirdToLast)) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                });
            }


            /**
             * Traps focus within modal
             */
            function handleModal(referrer) {
                setTimeout(() => {
                    const modalContent = $(".modal-content");
                    if (!modalContent[0]) {
                        return;
                    }

                    const focusable = modalContent.find('a[href]:not(.hidden), button, select, input');
                    trapFocus(modalContent[0], focusable, false, true);
                    focusable[1] ? focusable[1].focus() : focusable[0]?.focus();

                    const dropDown = modalContent.find(".dropdown-toggle");
                    makeDropDownTabbable(dropDown, modalContent, false, true)

                    // Handle composer if closing a modal opens the composer (ex if you a reply a topic that is old)
                    $(focusable).on("click", () => {
                        setTimeout(() => {
                            handleComposer();
                            onModalClose(referrer);
                        }, 100);
                    })

                    // If there are items that needs to outline parent to have a visible focus
                    OutlineParent();

                    // Reinstance clickOnEnterPress for modal
                    const keypressEnterClick = $(`[data-keypress-enter]`);
                    keypressEnterClick.each((i, el) => {
                        clickOnEnterPress(el);
                    });
                }, 500);
            }


            /**
             * Traps focus wihtin panel
             */
            function handlePanel(referrer) {
                setTimeout(() => {
                    const panelContent = $(".panel");
                    if (!panelContent[0]) {
                        return;
                    }

                    const focusable = panelContent.find('a[href]:not(.hidden), button, select, input');
                    trapFocus(panelContent[0], focusable, false, true);
                    focusable[0] && focusable[0].focus();
                    focusable.on("click", () => {
                        onPanelClose(referrer);
                    })
                }, 200);
            }

            /**
             * Makes category dropdown accessible with tabbing
             *
             * @param {*} dropDown The button which triggers the dropdown
             * @param {*} parentElement The element to search for the dropdown menu items
             * @param {*} toFocusOnClose This element will recieve focus when dropdown is closed with escape, set to false and it won't be used
             * @param {*} skipToMainContent Set to true if you should skip to main content
             */
            function makeDropDownTabbable(dropDown, parentElement, toFocusOnClose, skipToMainContent) {
                // Make the category-dropdown menu accessible with tabbing
                $(dropDown[0]).on("click", e => {
                    setTimeout(() => {
                        const ddMenu = parentElement.find(".category-dropdown-menu");
                        const ddFocusable = ddMenu.find("a");
                        ddFocusable.splice(0, 1);
                        if (!ddFocusable[0]) {
                            return;
                        }
                        ddFocusable.each((i, el) => {
                            el.tabIndex = 0;
                            el.href = "#";
                            i == 0 && el.focus();
                        })
                        trapFocus(ddMenu[0], ddFocusable, toFocusOnClose, skipToMainContent);
                    }, 300);
                })
            }

            // Set focus outline on parent instead of focusable child
            function OutlineParent() {
                $('[data-outlineparent] > *')
                    .focus(function () {
                        $(this).closest("[data-outlineparent]").addClass('focused');
                    })
                    .blur(function () {
                        $(this).closest("[data-outlineparent]").removeClass('focused');
                    });
            }

            function SetHandlers() {
                setTimeout(() => {
                    // Handle modal when a modal-trigger is clicked
                    $("[data-openmodal]").on("click", e => {
                        handleModal(e.currentTarget);
                    });

                    // Handle panel when a panel-trigger is clicked
                    $("[data-openpanel").on("click", e => {
                        handlePanel(e.currentTarget);
                    });

                    // Make a click when pressing enter-key on these elements
                    $("[data-keypress-enter]").each((i, el) => {
                        clickOnEnterPress(el);
                    });

                    // Traps the focus within a range of elements
                    $("[data-trapfocus]").each((i, el) => {
                        trapFocus(el);
                    });

                    // Handle composer when element is clicked
                    $("[data-handlecomposer]").on("click", e => {
                        handleComposer(e.currentTarget);
                    });
                }, 150);
            }

            function onModalClose(referrer) {
                setTimeout(() => {
                    const modalContent = $(".modal-content");
                    if (modalContent.length == 0) {
                        const dropdown = $(referrer).parent().parent().siblings("[data-toggle='dropdown']");
                        dropdown.length > 0 ? dropdown.focus() : referrer?.focus();
                    }
                }, 200);
            }

            function onPanelClose(referrer) {
                setTimeout(() => {
                    const panel = $(".panel");
                    if (panel.length == 0) {
                        const dropdown = $(referrer).parent().parent().siblings("[data-toggle='dropdown']");
                        dropdown.length > 0 ? dropdown.focus() : referrer?.focus();
                    }
                }, 200);
            }

            function onComposerClose(referrer) {
                setTimeout(() => {
                    const composer = $("[component=composer]");
                    if (composer.length == 0) {
                        referrer?.focus();
                    }
                }, 200);
            }
            /* #endregion */

            // Inits
            setDisplayOnMobileMenus();
            SetHandlers();
            trapFocus(userControls[0]);
        })
    }
})