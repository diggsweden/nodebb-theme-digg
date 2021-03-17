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

function Tabbing() {
	const focusableElements = 'a[href]:not([disabled]):not(.hidden), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';

	// Skips all menu items and sets focus on first focusable element in main
	$('.skip-to-content').on('click', ev => {
		ev.preventDefault();

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
	$('#mobile-menu').on('click', ev => {
		const menu = $('#menu');
		menu.css('display', `${"block"}`);
		trapFocus(menu[0]);
		skipToElement($('.menu-profile'), true);
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
		var key = e.which;
		if (key == 13)  // the enter key code
		{
			$('#user_dropdown').click();
			const userControls = $('#user-control-list');
			trapFocus(userControls[0]);
			skipToElement(userControls[0].querySelectorAll(focusableElements));
		}
	});

	$("#new_topic").keypress(e => {
		var key = e.which;
		if (key == 13)  // the enter key code
		{
			$("#new_topic").click();
		}
	})

	// Force a display reset on menu if its closed with click outside
	$('main').on('click', ev => {
		$('html').hasClass('slideout-open') && clickOutside($('#menu')[0]);
	});


	$("#new_topic").on("click", e => {
		handleComposer();
	})

	/**
	 * Make tabbing accessible in the composer
	 */
	function handleComposer() {
		setTimeout(() => { // Timeout effects are used to wait for components to mount
			const composer = $("[component=composer]");
			console.log(composer)
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
				}

				//focus the "New topic"-button when the editor i closed
				$(composer).keydown(e => {
					var key = e.which;
					if (key == 27)  // the escape key code
					{
						$("#new_topic").focus();
					}
				})

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

				// Make the category-dropdown menu accessible with tabbing
				$(dropDown[0]).on("click", e => {
					setTimeout(() => {
						const ddMenu = composer.find(".category-dropdown-menu");
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
						trapFocus(ddMenu[0], ddFocusable, $("#new_topic")[0]);

					}, 300);
				})
			}, 100);
		}, 100);
	}

	function clickOnEnterPress() {
		const elements = $("html").find(`[data-keypress-enter]`);
		elements && $(elements).each((index, el) => {
			$(el).keypress(e => {
				if (e.which == 13) {
					el.click();
				}
			})
		})
	}

	function trapElements() {
		const elements = $("html").find(`[data-trapfocus]`);
		// Trap focus on all elements with data-focustrap
		elements.each((index, el) => {
			trapFocus(el);
		});
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
	function clickOutside(element, nextToFocus) {
		const parent = element.parentElement;
		parent ? parent.click() : console.log('click outside failed');
		nextToFocus && nextToFocus.focus();
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
	function trapFocus(element, focusableEl, nextToFocus) {
		const focusable = focusableEl ? focusableEl : element.querySelectorAll(focusableElements);
		const firstFocusable = focusable[0];
		const lastFocusable = focusable[focusable.length - 1];
		const KEYCODE_TAB = 9;
		const KEYCODE_ESCAPE = 27;

		element.addEventListener('keydown', e => {
			const tabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
			const escapePressed = (e.key === 'Escape' || e.keyCode === KEYCODE_ESCAPE);

			escapePressed && clickOutside(element, nextToFocus);

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
				if (document.activeElement === lastFocusable) {
					firstFocusable.focus();
					e.preventDefault();
				}
			}
		});
	}

	// Initialize css display on menus
	setDisplayOnMobileMenus();
	trapElements();
	clickOnEnterPress();
}

function init(data) {
	if (data.title === '[[pages:home]]') {
		$('.digg-image').show();
		$('.digg-divider').hide();
	} else {
		$('.digg-image').hide();
		$('.digg-divider').show();
	}
	Tabbing();
}

$(document).ready(function () {
	$(window).on('action:ajaxify.end', function (event, data) {
		init(data);
	});
});