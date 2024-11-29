/**
 * @file Utility functions for working with localizated strings.
 * Based on the implementation included in the original Roblox chat system.
 * @license LGPL-3.0
 */

import { Chat, LocalizationService } from "@rbxts/services";

let translator: Translator;
let triedToLoadTranslator = false;

function getTranslator() {
	if (!translator && !triedToLoadTranslator) {
		triedToLoadTranslator = true;
		const localizationTable = Chat.WaitForChild("ChatLocalization", 5) as LocalizationTable;
		if (localizationTable) translator = localizationTable.GetTranslator(LocalizationService.RobloxLocaleId);
		else warn("[TC] Cannot find ChatLocalization, is rbxChat loaded?");
	}
	return translator;
}

export function get(key: string, defaultValue: string, params?: Map<string, string>): string {
	try {
		return getTranslator().FormatByKey(key, params);
	} catch (e) {
		warn("[TC] Cannot localize " + key + ": ", e);
		return defaultValue;
	}
}

export function localizeFormattedMessage(message: string): string {
	try {
		const [keyStart, keyEnd] = message.find("{RBX_LOCALIZATION_KEY}");
		if (!keyStart || !keyEnd) return message;
		const [defaultStart, defaultEnd] = message.find("{RBX_LOCALIZATION_DEFAULT}");
		if (!defaultStart || !defaultEnd) return message;
		const [paramStart, paramEnd] = message.find("{RBX_LOCALIZATION_PARAMS}");
		const key = message.sub(keyEnd + 1, defaultStart - 1);
		if (!paramStart) return get(key, message.sub(defaultEnd + 1));

		const defaultValue = message.sub(defaultEnd + 1, paramStart - 1);
		const params = message.sub(paramEnd! + 1);
		const extraParameters = new Map<string, string>();
		const matches = params.gmatch("([^%s]+)=([^%s]+)");
		for (const i of matches) {
			const [key, value] = i;
			extraParameters.set(tostring(key), tostring(value));
		}
		return get(key, defaultValue, extraParameters);
	} catch (e) {
		warn("Failed to localize chat message, is rbxChat present? ", e);
		return message;
	}
}
