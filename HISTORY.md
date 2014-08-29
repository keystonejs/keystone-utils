## v0.1.12 / 2014-08-29

* updated; underscore to ~0.1.7

## v0.1.11 / 2014-08-29

* fixed; String functions now correctly convert anything with a `toString()` method instead of returning a blank string

## v0.1.10 / 2014-05-28

* fixed; Handle smart apostrophe in slug, thanks [Alan Shaw](https://github.com/alanshaw)
* improved; Tests converted to mocha, run with `npm test`. thanks [Stefan Aebischer](https://github.com/pAlpha627)

## v0.1.9 / 2014-04-1

* added; `calculateDistance`, `kmBetween` and `milesBetween` distance calculation methods

## v0.1.8 / 2014-03-27

* added; support for transliterating Russian and Ukranian words in `exports.slug` via `exports.transliterate`, thanks [DrMoriarty](https://github.com/DrMoriarty)

## v0.1.7 / 2014-03-18

* added; support for converting accented characters (diacritics) to their simple equivalents in `exports.slug` via `exports.stripDiacritics`

## v0.1.6 / 2014-01-24

* added; escapeString method

## v0.1.5 / 2014-01-24

* fixed; better protection for string conversion functions with `undefined` / non-string arguments

## v0.1.4 / 2013-12-23

* fixed; `exports.encodeHTMLEntities` was missing, incorrectly overriding `exports.decodeHTMLEntities`

## v0.1.3 / 2013-12-06

* added; randomString method

## v0.1.2 / 2013-12-03

* improved; support for extended characters in utils.pathToLabel #2, thanks [itzaks](https://github.com/itzaks)

## v0.1.1 / 2013-11-18

* added; including the `html-stringify` module as `exports.htmlStringify()`
	* see https://github.com/JedWatson/html-stringify

## v0.1.0 / 2013-11-06

* initial release; branched from core KeystoneJS codebase