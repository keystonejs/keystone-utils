# Changelog

## v0.4.0 / 2016-05-08

* fixed; switched slug dependency to `speakingurl` for Node.js v0.10+ support

Hopefully this is the last of the rapid releases we'll have switching out the
slug package. SpeakingURL works with all Node.js versions from v0.10 to 6, and
has full feature parity with the `slug` package we were previously using.

Support for `limax` is still in place, if you need support for Latin, Cyrillic,
Chinese and Japanese characters simply install it in your project.

## v0.3.6 / 2016-05-08

* fixed; switched slug dependency back to `slug` due to problems in Keystone proper

## v0.3.5 / 2016-05-06

* fixed; switched slug dependency to `mollusc` (fork of `slug`) for Node.js v6+ support

## v0.3.4 / 2016-02-18

* added; `defer` method

## v0.3.3 / 2016-02-14

* added; `isDataURL` method, thanks [Riyadh Al Nur](https://github.com/riyadhalnur)

## v0.3.2 / 2015-12-05

* added; `noop` method
* fixed; `exports.kmBetween` was incorrectly pointing at `milesBetween`

Thanks to [Adnan Asani](https://github.com/adnasa) for the fixes in this release

## v0.3.1 / 2015-11-29

* removed; underscore dependency (requied methods are now included in `index.js`)
* changed; `options` now augments and returns the first argument

Thanks to [Adnan Asani](https://github.com/adnasa) for the fixes in this release

## v0.3.0 / 2015-07-31

* changed; now shipping with the `slug` package by default

`limax` is now an optional package due to ongoing build issues with its dependencies on certain platforms. To use it (if you want support for Latin, Cyrillic, Chinese and Japanese characters) simply install it in your project; it will automatically be detected and used by `keystone-utils.slug()`.

## v0.2.3 / 2015-07-15

* updated; `randomString` has now been published as its own package `randomkey`, still available as `utils.randomString`

## v0.2.2 / 2015-07-14

* updated; `limax` dependency, previous version was causing some build issues

## v0.2.1 / 2015-07-12

* fixed; issues with `htmlToText` and `decodeHTMLEntities`, thanks [Armel Larcier](https://github.com/Benew)
* improved; `options` method rewritten for clarity, and tests added

## v0.2.0 / 2015-05-31

* added; [happiness](https://github.com/JedWatson/happiness) linter
* fixed; all linter warnings :)
* changed; now using [limax](https://github.com/lovell/limax) to generate slugs, which handles Latin, Cyrillic, Chinese and Japanese

Special thanks to [Arthur Chan](https://github.com/arthurtalkgoal) and [Lovell Fuller](https://github.com/lovell) for their help getting `limax` integrated and working with our tests!

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
