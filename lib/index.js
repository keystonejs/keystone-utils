// Credits:
// ========
// 
// Some utils borrowed from / inspired by mongoose/utils.js
// see https://github.com/LearnBoost/mongoose
// 
// HTML Entity encode / decode is based on code in node-html-to-text
// see https://github.com/werk85/node-html-to-text

var _ = require('underscore'),
	inflect = require('i')();

// HTML Entities for Text <> HTML conversion
var htmlEntities = require('./htmlEntities'),
	htmlEntitiesMap = {},
	htmlEntitiesRegExp = '';

(function() {
	for (var i in htmlEntities) {
		var ent = String.fromCharCode(htmlEntities[i]);
		htmlEntitiesMap[ent] = i;
		htmlEntitiesRegExp += '|' + ent;
	}
	htmlEntitiesRegExp = new RegExp(htmlEntitiesRegExp.substr(1), 'g');
})();

// Diacritics support
var diacritics = require('./diacritics');
// Cyrillic transliteration
var transliteration = require('./transliteration.cyr');

// Constants for distance calculation
var RADIUS_KM = 6371,
	RADIUS_MILES = 3959;

/**
 * Determines if `arg` is a function.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isFunction = exports.isFunction = function(arg) {
	return ('function' === typeof arg);
}


/**
 * Determines if `arg` is an object.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isObject = exports.isObject = function(arg) {
	return '[object Object]' === Object.prototype.toString.call(arg);
}


/**
 * Determines if `arg` looks like a valid mongo ObjectId
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isValidObjectId = exports.isValidObjectId = function(arg) {
	var len = arg.length;
	if (len === 12 || len === 24) {
		return /^[0-9a-fA-F]+$/.test(arg);
	} else {
		return false;
	}
}


/**
 * Determines if `arg` is an array.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isArray = exports.isArray = function(arg) {
	return Array.isArray(arg);
}


/**
 * Determines if `arg` is a date.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isDate = exports.isDate = function(arg) {
	return '[object Date]' === Object.prototype.toString.call(arg);
}


/**
 * Determines if `arg` is a string.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isString = exports.isString = function(arg) {
	return 'string' === typeof arg;
}


/**
 * Determines if `arg` is a number.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @return {Boolean}
 * @api public
 */

var isNumber = exports.isNumber = function(arg) {
	return 'number' === typeof arg;
}


/**
 * Make sure an email address looks valid.
 * May cause false-negatives in extremely rare cases, see
 * http://www.regular-expressions.info/email.html
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

var isEmail = exports.isEmail = function(str) {
	return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.['a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(str);
} // ' // sublime syntax hilighter fix


/**
 * Copies and merges options with defaults.
 *
 * @param {Object} defaults
 * @param {Object} options
 * @return {Object} the options argument merged with defaults
 * @api public
 */

var options = exports.options = function(defaults, options) {
	
	options = options || {};
	
	if (!defaults)
		return options;
	
	var keys = Object.keys(defaults), i = keys.length, k;

	while (i--) {
		k = keys[i];
		if (!(k in options)) {
			options[k] = defaults[k];
		}
	}

	return options;
	
}


/**
 * Creates a map of options
 *
 * @param {Array} options
 * @param {String} property to map
 * @param {Boolean} clone the options?
 * @return {Object} the map object
 * @api public
 */

var optionsMap = exports.optionsMap = function(arr, property, clone) {
	if (arguments.length === 2 && 'boolean' === typeof property) {
		clone = property;
		property = undefined;
	}
	var obj = {};
	for (var i = 0; i < arr.length; i++) {
		var prop = (property) ? arr[i][property] : arr[i];
		if (clone) {
			prop = _.clone(prop);
		}
		obj[arr[i].value] = prop;
	}
	return obj;
}

/**
 * Recursively binds method properties of an object to a scope
 * and returns a new object containing the bound methods
 *
 * @param {Object} object with method properties, can be nested in other objects
 * @param {Object} scope to bind as `this`
 * @return {Object} a new object containing the bound methods
 * @api public
 */

var bindMethods = exports.bindMethods = function(obj, scope) {
			
	var bound = {};
	
	for (var prop in obj) {
		if ('function' === typeof obj[prop]) {
			bound[prop] = obj[prop].bind(scope);
		} else if (isObject(obj[prop])) {
			bound[prop] = bindMethods(obj[prop], scope);
		}
	}
	
	return bound;
	
}


/**
 * Generates a 'random' string of characters to the specified length.
 * 
 * @param {Number or Array}   len      the length of string to generate, can be a range (Array), Defaults to 10.
 * @param {String}            chars    characters to include in the string, defaults to `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`
 * @return {String}
 * @api public
 */

var randomString = exports.randomString = function(len, chars) {
	
	var str = '';
	
	if (!len) {
		len = 10;
	} else if (isArray(len)) {
		var min = number(len[0]);
		var max = number(len[1]);
		len = Math.round(Math.random() * (max - min)) + min;
	} else {
		len = number(len);
	}
	
	chars = chars || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
	
	for (var i = 0; i < len; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return str;
	
}


/**
 * Converts a string to a number, accepting human-friendly input, e.g.
 * - 1,432
 * - $1432
 * - 2.5
 *
 * @param {String} input
 * @return {Number} number
 * @api public
 */

var number = exports.number = function(str) {
	return parseFloat(String(str).replace(/[^\-0-9\.]/g, ''));
}


/**
 * Escapes a string to be safely converted to a regular expression
 *
 * @param {String} string
 * @return {String} escaped string
 * @api public
 */

var escapeRegExp = exports.escapeRegExp = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


/**
 * Escapes a string to be safely used as a literal Javascript string
 *
 * @param {String} string
 * @return {String} escaped string
 * @api public
 */

var escapeString = exports.escapeString = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return str.replace(/[\\'"]/g, "\\$&");
}


/**
 * Strips diacritics from a string, replacing them with their simple equivalents
 *
 * @param {String} string
 * @return {String} stripped string
 * @api public
 */

var stripDiacritics = exports.stripDiacritics = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	var rtn = [];
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		rtn.push(diacritics[c] || c);
	}
	return rtn.join('');
}


/**
 * Transliterates Russian and Ukrainian words from cyrillic to latin.
 * 
 * @param  {String} word
 * @return {String} transliterated word
 * @api public
 */
var transliterate = exports.transliterate = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	var rtn = [];
	// applying зг-zgh rule
	str = str.replace(transliteration.regexp.Zgh, 'Zgh');
	str = str.replace(transliteration.regexp.zgh, 'zgh');
	// replace characters with equivalent maps
	for (var i = 0; i < str.length; i++) {
		var character = str[i],
			latinCharacter = transliteration.characterMap[character];
		rtn.push((latinCharacter || '' === latinCharacter) ? latinCharacter : character);
	}
	return rtn.join('');
};


/**
 * Generates a slug from a string. Word breaks are hyphenated.
 * 
 * You can optionally provide a custom separator.
 *
 * @param {String} str
 * @param {String} sep (defaults to '-')
 * @return {String} slug
 * @api public
 */

var slug = exports.slug = function(str, sep) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	sep = sep || '-';
	var esc = escapeRegExp(sep);
	str = stripDiacritics(str);
	str = transliterate(str);
	return str.replace(/['’"()\.]/g, '').replace(/[^a-z0-9_\-]+/gi, sep).replace(new RegExp(esc + '+', 'g'), sep).replace(new RegExp('^' + esc + '+|' + esc + '+$'), '').toLowerCase();
}


/**
 * Converts a string to its singular form
 *
 * @param {String} str
 * @return {String} singular form of str
 * @api public
 */

var singular = exports.singular = function(str) {
	return inflect.singularize(str);
}


/**
 * Displays the singular or plural of a string based on a number
 * or number of items in an array.
 * 
 * If arity is 1, returns the plural form of the word.
 *
 * @param {String} count
 * @param {String} singular string
 * @param {String} plural string
 * @return {String} singular or plural, * is replaced with count
 * @api public
 */

var plural = exports.plural = function(count, sn, pl) {
	
	if (arguments.length === 1) {
		return inflect.pluralize(count);
	}
	
	if ('string' != typeof sn) sn = '';
	
	if (!pl) {
		pl = inflect.pluralize(sn);
	}
	
	if ('string' === typeof count) {
		count = Number(count);
	} else if ('number' !== typeof count) {
		count = _.size(count);
	}
	
	return (count == 1 ? sn : pl).replace('*', count);
	
}


/**
 * Converts the first letter in a string to uppercase
 *
 * @param {String} str
 * @return {String} Str
 * @api public
 */

var upcase = exports.upcase = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return (str.substr(0,1).toUpperCase() + str.substr(1));
}


/**
 * Converts the first letter in a string to lowercase
 *
 * @param {String} Str
 * @return {String} str
 * @api public
 */

var downcase = exports.downcase = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return (str.substr(0,1).toLowerCase() + str.substr(1));
}


/**
 * Converts a string to title case
 *
 * @param {String} str
 * @return {String} Title Case form of str
 * @api public
 */

var titlecase = exports.titlecase = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
	var parts = str.split(/\s|_|\-/);
	for (var i = 0; i < parts.length; i++) {
		if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
			parts[i] = upcase(parts[i]);
		}
	}
	return _.compact(parts).join(' ');
}


/**
 * Converts a string to camel case
 *
 * @param {String} str
 * @param {Boolean} lowercaseFirstWord
 * @return {String} camel-case form of str
 * @api public
 */

var camelcase = exports.camelcase = function(str, lc) {
	return inflect.camelize(str, !(lc));
}


/**
 * Decodes HTML Entities in a string
 *
 * @param {String}
 * @return {String}
 * @api public
 */

var decodeHTMLEntities = exports.decodeHTMLEntities = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return str.replace(/&[^;]+;/g, function(match, ent) {
		return String.fromCharCode(ent[0] !== '#' ? htmlEntities[ent] : ent[1] === 'x' ? parseInt(ent.substr(2),16) : parseInt(ent.substr(1), 10));
	});
};


/**
 * Encodes HTML Entities in a string
 *
 * @param {String}
 * @return {String}
 * @api public
 */

var encodeHTMLEntities = exports.encodeHTMLEntities = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return str.replace(htmlEntitiesRegExp, function(match) {
		return '&' + htmlEntitiesMap[match] + ';';
	});
};


/**
 * Takes `obj`, `JSON.stringify`s it and escapes illegal JS but valid JSON unicode
 * characters.
 * 
 * @param {Object} obj
 * @return {String}
 * @apu public
 */

var stringify = exports.stringify = function(obj) {
	return JSON.stringify(obj).replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
		return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
	});
};


/**
 * Converts text to HTML (line breaks to <br>)
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

var textToHTML = exports.textToHTML = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	return encodeHTMLEntities(str).replace(/\n/g, '<br>');
}


/**
 * Ultra simple converter to turn HTML into text.
 * 
 * Really only useful when you need a lightweight way to remove html from a string
 * before cropping it, so you don't end up with partial tags or an invalid DOM
 * structure.
 * 
 * It will convert `br`, `p`, `div`, `li`, `td`, `th` tags to single line-breaks.
 * All other tags are stripped.
 * 
 * Multiple line breaks are then compressed to a single line break, and leading /
 * trailing white space is stripped.
 * 
 * For a more sophisticated use-case, you should check out the `to-markdown` and
 * `html-to-text` packages on npm.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

var htmlToText = exports.htmlToText = function(str) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	// remove all source-code line-breaks first
	str = str.replace(/\n/g, '');
	// turn non-breaking spaces into normal spaces
	str = str.replace(/&nbsp;/g, ' ');
	// <br> tags become single line-breaks
	str = str.replace(/<br>/gi, '\n');
	// <p>, <li>, <td> and <th> tags become double line-breaks
	str = str.replace(/<(?:p|li|td|th)[^>]*>/gi, '\n');
	// strip all other tags (including closing tags)
	str = str.replace(/<[^>]*>/g, '');
	// compress white space
	str = str.replace(/(\s)\s+/g, '$1');
	// remove leading or trailing spaces
	str = str.replace(/^\s+|\s+$/g, '');
	
	return decodeHTMLEntities(str);
}


/**
 * Crops a string to the specified length.
 * 
 * You can optionally a string to append (only appended if the original string was longer
 * than the specified length).
 * 
 * If preserveWords is true, the length is extended to the end of the last word that would
 * have been cropped.
 *
 * @param {String} string to crop
 * @param {Number} length to crop to
 * @param {String} string to append
 * @param {Boolean} whether to preserve the last word in full
 * @return {String} cropped string
 * @api public
 */

var cropString = exports.cropString = function(str, length, append, preserveWords) {
	
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	
	if ('boolean' == typeof append) {
		preserveWords = append;
		append = null;
	}
	
	str = String(str);
	
	if (str.length <= length) return str;
	
	var cropTo = length;
	
	if (preserveWords) {
		var r = str.substr(cropTo);
		var word = r.match(/^\w+/);
		if (word && word.length) {
			cropTo += word[0].length;
		}
	}
	
	var rtn = str.substr(0, cropTo);
	
	return (rtn.length < str.length && append) ? rtn + append : rtn;
	
}


/**
 * Crops an HTML string safely by converting it to text, cropping it, then converting it
 * back to HTML. Also prevents cross-site attacks by stripping tags.
*/

var cropHTMLString = exports.cropHTMLString = function(str, length, append, preserveWords) {
	return textToHTML(cropString(htmlToText(str), length, append, preserveWords));
}


/**
 * Converts a key to a label.
 *
 * @param {String} key
 * @return {String}
 * @api public
 */

var keyToLabel = exports.keyToLabel = function(str) {
	
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	
	str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
	str = str.replace(/([0-9])([a-zA-Z])/g, '$1 $2');
	str = str.replace(/([a-zA-Z])([0-9])/g, '$1 $2');

	var parts = str.split(/\s|\.|_|-|:|;|([A-z\u00C0-\u00ff]+)/);
	
	for (var i = 0; i < parts.length; i++) {
		if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
			parts[i] = upcase(parts[i]);
		}
	}
	
	return _.compact(parts).join(' ');
	
}


/**
 * Converts a key to a path. Like slug(keyToLabel(str)) but
 * optionally converts the last word to a plural.
 *
 * @param {String} key
 * @return {String}
 * @api public
 */

var keyToPath = exports.keyToPath = function(str, plural) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	parts = slug(keyToLabel(str)).split('-');
	if (parts.length && plural) {
		parts[parts.length-1] = inflect.pluralize(parts[parts.length-1])
	}
	return parts.join('-');
}


/**
 * Converts a key to a property. Like keyToPath but converts
 * to headlessCamelCase instead of dash-separated
 *
 * @param {String} key
 * @return {String}
 * @api public
 */

var keyToProperty = exports.keyToProperty = function(str, plural) {
	if (str && str.toString) str = str.toString();
	if (!isString(str) || !str.length) return '';
	parts = slug(keyToLabel(str)).split('-');
	if (parts.length && plural) {
		parts[parts.length-1] = inflect.pluralize(parts[parts.length-1])
	}
	for (var i = 1; i < parts.length; i++) {
		parts[i] = upcase(parts[i]);
	}
	return parts.join('');
}

/**
 * Distance calculation function
 * 
 * See http://en.wikipedia.org/wiki/Haversine_formula
 * 
 * @param {Array} point1
 * @param {Array} point2
 * @return {Number} distance in radians
 * @api public
 */

var calculateDistance = exports.calculateDistance = function(point1, point2) {
	
	var dLng = (point2[0] - point1[0]) * Math.PI / 180;
	var dLat = (point2[1] - point1[1]) * Math.PI / 180;
	var lat1 = (point1[1]) * Math.PI / 180;
	var lat2 = (point2[1]) * Math.PI / 180;
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	
	return c;
	
}


/**
 * Returns the distance between two [lat,lng] points in kilometres
 * 
 * @param {Array} point1
 * @param {Array} point2
 * @return {Number} distance in kilometres
 * @api public
 */

var kmBetween = exports.kmBetween = function(point1, point2) {
	return calculateDistance(point1, point2) * RADIUS_KM;
}


/**
 * Returns the distance between two [lat,lng] points in miles
 * 
 * @param {Array} point1
 * @param {Array} point2
 * @return {Number} distance in miles
 * @api public
 */

var milesBetween = exports.milesBetween = function(point1, point2) {
	return calculateDistance(point1, point2) * RADIUS_MILES;
}
