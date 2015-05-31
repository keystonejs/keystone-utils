/*
* Copyright (c) 2013 Alexander Prozorov (staltec@gmail.com)
* https://github.com/Staltec/transliteration
*
* Copyright (c) 2011-2012 Anton Podviaznikov (anton@podviaznikov.com) by fork from https://github.com/podviaznikov/ua.transliteration
*
* Copyright (c) 2011 Enginimation Studio (http://enginimation.com).
*
* Copyright (c) 2014 Jed Watson (adaptation for keystone-utils)
*
* May be freely distributed under the MIT license.
*
*/

exports.characterMap = {
	'А': 'A',
	'а': 'a',
	'Б': 'B',
	'б': 'b',
	'В': 'V',
	'в': 'v',
	'Г': 'G',	// russian
	'г': 'g',	// russian
	'Ґ': 'G',
	'ґ': 'g',
	'Д': 'D',
	'д': 'd',
	'Е': 'E',
	'е': 'e',
	'Ё': 'E',
	'ё': 'e',
	'Є': 'Ye',	// just on the word beginning
	'є': 'ie',
	'Ж': 'Zh',
	'ж': 'zh',
	'З': 'Z',
	'з': 'z',
	'И': 'Y',
	'и': 'y',
	'І': 'I',
	'і': 'i',
	'Ї': 'Yi',	// just on the word beginning
	'ї': 'i',
	'Й': 'Y',	// just on the word beginning
	'й': 'i',
	'К': 'K',
	'к': 'k',
	'Л': 'L',
	'л': 'l',
	'М': 'M',
	'м': 'm',
	'Н': 'N',
	'н': 'n',
	'О': 'O',
	'о': 'o',
	'П': 'P',
	'п': 'p',
	'Р': 'R',
	'р': 'r',
	'С': 'S',
	'с': 's',
	'Т': 'T',
	'т': 't',
	'У': 'U',
	'у': 'u',
	'Ф': 'F',
	'ф': 'f',
	'Х': 'Kh',
	'х': 'kh',
	'Ц': 'Ts',
	'ц': 'ts',
	'Ч': 'Ch',
	'ч': 'ch',
	'Ш': 'Sh',
	'ш': 'sh',
	'Щ': 'Shch',
	'щ': 'shch',
	'Ы': 'Y',
	'ы': 'y',
	'Э': 'E',
	'э': 'e',
	'Ю': 'Yu',	// just on the word beginning
	'ю': 'iu',
	'Я': 'Ya',	// just on the word beginning
	'я': 'ia',
	'Ь': '',	// not transliterated
	'ь': '',	// not transliterated
	'Ъ': '',	// not transliterated
	'ъ': '',	// not transliterated
	"'": ''		// not transliterated
};

exports.regexp = {
	Zgh: new RegExp('Зг', 'g'),
	zgh: new RegExp('зг', 'g')
};
