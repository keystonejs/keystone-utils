Keystone Utils
==============

A useful library of utilities for node.js used by
[KeystoneJS](http://keystonejs.com) and you!

It provides additional functionality for manipulating and converting various
types of data, including converting strings between various forms, and
lightweight html &larr; &rarr; text conversion.


## Usage

	npm install keystone-utils --save

... then ...

	var utils = require('keystone-utils');
	console.log(utils.isObject({})); // true!

### Bundled with KeystoneJS

If you're using [KeystoneJS](http://keystonejs.com), it exposes this library
as `.utils`.

	var keystone = require('keystone');
	var utils = keystone.utils;


## Test utilities

*	`isFunction(arg)` - determines if `arg` is a function
*	`isObject(arg)` - determines if `arg` is an object
*	`isValidObjectId(arg)` - determines if `arg` looks like a valid MongoDB ObjectId
*	`isArray(arg)` - determines if `arg` is an array
*	`isDate(arg)` - determines if `arg` is a date
*	`isString(arg)` - determines if `arg` is a string
*	`isNumber(arg)` - determines if `arg` is a number
*	`isDataURL(arg)` - determines if `arg` is a base64 encoded data URI
*	`isEmail(arg)` - make sure `arg` looks like a valid email address
	*	Uses a regular expression to check, so may cause false-negatives in
		extremely rare cases. See http://www.regular-expressions.info/email.html

## Option utilities

*	`options(defaults, options)` - copies and merges options into the defaults
*	`optionsMap(arr, property, clone)` - creates a map of options
	*	Turns an array of objects into an object of objects, with each object
		under the value of `property`
	*	Performs a deep clone of the objects when `clone` is set to true

## Function utilities

*	`noop()` - a simple function that does nothing ("no operation")
*	`defer(fn, args...)` - wraps the function and invokes it in `process.nextTick`, great for Zalgo containment
*	`bindMethods(obj, scope)` - recursively binds method properties of `obj`
	to `scope` and returns a new object containing the bound methods.

## Random utilities

*	`randomString(len, chars)` - Generates a 'random' string of characters to the
	specified length (uses Math.random).
	*	`len` can be an array of `[min, max]` length to generate
	*	`chars` is a string of characters to include, defaults to
		`0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`

## Conversion utilities

*	`number(arg)` - converts a string to a number, accepting human-friendly input
	*	e.g. `1,432` &raquo; `1432`, `$1432` &raquo; `1432`, `2.5` &raquo; `2.5`
*	`escapeRegExp(str)` - escapes a string to be safely converted to a regular expression
*	`escapeString(str)` - escapes a string to be safely used as a Javascript string literal
*	`stripDiacritics(str)` - stips accented characters from a string, replacing them with their simple equivalents
*	`transliterate(str)` - transliterates Russian and Ukrainian words from cyrillic to latin
*	`singular(str)` - converts a string to its singular form
*	`plural(count, singular, plural)` - displays the singular or plural of a string
	based on a number or number of items in an array.
	*	Replaces `*` in the string with the number
	*	Will automatically convert `singular` to `plural` when plural is not provided
	*	When only given one argument, will return the plural form of a string
	*	e.g.
		*	`plural(1, '* thing')` &raquo; `'1 thing'`
		*	`plural(2, '* thing')` &raquo; `'2 things'`
		*	`plural([1,2], 'single', 'couple')` &raquo; `'couple'`
		*	`plural('friend')` &raquo; `'friends'`
*	`upcase(str)` - converts the first letter in a string to Uppercase
*	`downcase(str)` - converts the first letter in a string to lowercase
*	`titlecase(str)` - converts a string to Title Case
*	`camelcase(str, lowercase)` - converts a string to camelCase
	*	The `lowercase` argument causes the first letter to be lowercase, and
		default to `true`.
*	`decodeHTMLEntities(str)` - decodes html entities in a string
*	`encodeHTMLEntities(str)` - encodes html entities in a string
*	`stringify(obj)` - safely stringifies an object to JSON for output in JavaScript source (escapes illegal JS but valid JSON unicode characters)
*	`textToHTML(str)` - lightweight conversion of text to HTML (line breaks to `<br>`)
*	`htmlToText(str)` - lightweight conversion to HTML to text
	*	Really only useful when you need a lightweight way to remove html from a
		string before cropping it, so you don't end up with partial tags or an
		invalid DOM structure.
	*	It will convert `br`, `p`, `div`, `li`, `td`, `th` tags to single
		line-breaks. All other tags are stripped.
	*	Multiple line breaks are then compressed to a single line break, and
		leading / trailing white space is stripped.
	*	For a more sophisticated use-case, you should check out the `to-markdown`
		and `html-to-text` packages on npm.
*	`cropString(str, length, append, preserveWords)` - crops a string to the
	specified length
	*	You can optionally provide a string to `append` (only appended if the
		original string was longer than the specified length).
	*	If `preserveWords` is true, the length is extended to the end of the last
		word that would have been cropped.
*	`cropHTMLString(str, length, append, preserveWords)` - crops an HTML string
	safely by converting it to text, cropping it, then converting it back to HTML
*	`slug(str, separator)` - generates a slug from a string. Word breaks are hyphenated.
	*	`separator` defaults to '-'
*	`keyToLabel(str)` - converts a key to a label
	*	e.g. `keyToLabel('myKey')` &raquo; `My Key`
*	`keyToPath(str, plural)` - converts a key to a path
	*	Like `slug(keyToLabel(str))` but will optionally converts the last word
		to a plural.
	*	e.g. `keyToPath('someThing', true)` &raquo; `some-things`
*	`keyToProperty(str, plural)` - Converts a key to a property.
	*	Like `keyToPath` but converts to headlessCamelCase instead of dash-separated
*	`calculateDistance(point1 [lat, lng], point2 [lat, lng])` - Returns the distance between two `[lat,lng]` points in radians
*	`kmBetween` - Returns the distance between two `[lat,lng]` points in kilometers
*	`milesBetween` - Returns the distance between two `[lat,lng]` points in miles



Credits
=======

Uses the inflect library for singular / plural conversion,
see https://github.com/pksunkara/inflect or `npm info i`

Some utils are borrowed from / inspired by `mongoose/utils.js`,
see https://github.com/LearnBoost/mongoose

HTML Entity encode / decode is based on code in `node-html-to-text`,
see https://github.com/werk85/node-html-to-text

The transliteration code is based on https://www.npmjs.org/package/transliteration.cyr
