var rcgfp = {
	cookieName   : 'rcgfp_form_data',
	cookieExpires: 30,

	init     : function () {
		var $formWrapper = $('.gform_wrapper');

		if ($formWrapper.length > 0) {
			// Save data on form submit.
			$('.gform_wrapper input[type="submit"]').on('click', rcgfp.save_data);

			// Read data on page load and prefill the form.
			$formWrapper.each(function () {
				rcgfp.post_render($(this));
			});

		}
	},
	save_data: function (e) {
		e.preventDefault();
		var $this = $(this);
		var $form = $this.parents('form');
		var dataToSave = [];

		$('[data-inputname]', $form).each(function () {
			var $input = $(this);
			var dynamicName = $input.data('inputname');
			var value = $input.val();

			dataToSave.push({
				name : dynamicName,
				value: value
			})
		});

		if (dataToSave.length > 0) {
			Cookies.set(rcgfp.cookieName, dataToSave, {
				expires: rcgfp.cookieExpires,
				path   : '/',
				secure : true
			});
		}

		console.log(dataToSave);

		return false;
	},

	post_render: function ($form) {
		var cookieValue = Cookies.getJSON(rcgfp.cookieName);

		if (typeof cookieValue === 'undefined' || cookieValue === 'undefined' || cookieValue === '') {
			return false;
		}

		for (var item in cookieValue) {
			if (!cookieValue.hasOwnProperty(item)) {
				continue;
			}

			var field = cookieValue[item];

			$('[data-inputname="' + field.name + '"]', $form).val(field.value);
		}
	}
};

jQuery(document).ready(rcgfp.init);


/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode(s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init(converter) {
		function api() {
		}

		function set(key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {
			}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get(key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {
						}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {
				}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {
	});
}));
