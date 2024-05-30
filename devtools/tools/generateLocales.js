import { readFile, readdir, writeFile } from 'fs/promises';

const main = async () => {
	/**
	 * Generate fallbacks
	 * @param {String} locale What locale to check fallbacks for
	 * @param {Array} fallbackList On init, an empty array of fallbcks. Gets added to recursivley
	 * @returns {Array} List of fallbacks
	 */
	const getFallbackLocales = (locale, fallbackList) => {
		// Check if the locale has any fallbacks
		if (localeData[locale]['info'].hasOwnProperty('fallbacks')) {
			// If so, then iterate through each fallback
			for (let fbLocale of localeData[locale]['info']['fallbacks']) {
				fallbackList.unshift(fbLocale);
				getFallbackLocales(fbLocale, fallbackList);
			}
		}

		return fallbackList;
	};

	/**
	 * Fills the gaps of a locale with its fallback text.
	 * @param {String} locale The locale to fill gaps in
	 */
	const fillGaps = (locale) => {
		flattenedLocale[locale] = localeData[locale]['entries'];

		// Check if the locale has any fallbacks
		if (localeData[locale]['info'].hasOwnProperty('fallbacks')) {
			// If it does, then iterate through every fallback in the list
			// We want to reverse the list in the event that multiple fallbacks
			// have the same string. We want the fallbacks higher up the list
			// to take priority, and I don't want to do a check for every
			// single string to make sure it didn't get filled in.
			for (let fallback of localeData[locale]['info']['fallbacks'].reverse()) {
				// Get what items the fallback has that the locale doesn't
				let difference = localeItems[fallback].filter((x) => !localeItems[locale].includes(x));

				// Iterate through every string that's different
				for (let string of difference) {
					// Add it to the locale
					flattenedLocale[locale][string] = localeData[fallback]['entries'][string];
				}
			}
		}
	};

	let localeList = await readdir('localization/locales'); // A list of all locales
	let localeData = {}; // An object of each locale
	let localeFallbacks = {}; // Create an empty array for the fallbacks
	let fallbackOrder = []; // The order in which the fallbacks should be generated
	let localeItems = {}; // An array of what entries each locale has
	let flattenedLocale = { info: { locales: {} } }; // Flattened locale. This is what gets returned in the end.

	// Remove the '.json' from each locale name
	localeList = localeList.map((locale) => {
		return locale.replace('.json', '');
	});

	// List what locales have been found
	console.log(`Found locales ${localeList.join(' ')}`);

	// Iterate through locales
	for (let defaultLocale of localeList) {
		// Read then parse the locale file
		let locale = await readFile(`localization/locales/${defaultLocale}.json`);
		locale = JSON.parse(locale);

		// Set it in to the locale data
		localeData[defaultLocale] = locale;

		// Add to the info
		flattenedLocale['info']['locales'][defaultLocale] = locale['info']['name'];

		// Get a list of all entries for a locale.
		// Useful later when we are making fallbacks
		localeItems[defaultLocale] = Object.keys(locale['entries']);
	}

	/// Generate fallbacks
	// This is probably horribly inefficient, I'll likely revisit it sometime
	// God help future me

	// Iterate through locales
	for (const locale of Object.keys(localeData)) {
		// Get all fallbacks for the wanted locale,
		// then for get all fallbacks for those fallback locales,
		// then for get all fallbacks for those fallback locales,
		// and so on and so forth.
		// Use [... new Set(array)] to remove duplicates.
		localeFallbacks[locale] = [...new Set(getFallbackLocales(locale, []))];
		fallbackOrder.push(...getFallbackLocales(locale, []), locale);
	}

	// Remove duplicates
	fallbackOrder = [...new Set(fallbackOrder)];

	// Iterate through locales
	for (const locale of fallbackOrder) {
		fillGaps(locale);
	}

	await writeFile('client/src/assets/locale.json', JSON.stringify(flattenedLocale));
};

main();
