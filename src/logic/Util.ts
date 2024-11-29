/**
 * @file Utility functions for getting the colours of a user.
 * @license LGPL-3.0
 */
/**
 * For reference, these colours and the algorithm implemented in
 * computeNameColour() are based on the algorithm written by Xsitsu.
 * The original implementation can be found here, and is licensed under the
 * Apache 2.0 license: (I am unsure if using Apache 2.0 is allowed in a LGPL-3
 * module (I am not a lawyer) but I'm hoping it is, and the original algorithm
 * is not used, only a reimplementation.)
 * https://github.com/Roblox/Core-Scripts/blob/master/CoreScriptsRoot/Modules/Server/ServerChat/DefaultChatModules/ExtraDataInitializer.lua
 */
const NAME_COLOURS = [
	new Color3(253 / 255, 41 / 255, 67 / 255), //new BrickColor("Bright red").Color,
	new Color3(1 / 255, 162 / 255, 255 / 255), //new BrickColor("Bright blue").Color,
	new Color3(2 / 255, 184 / 255, 87 / 255), //new BrickColor("Earth green").Color,
	new BrickColor("Bright violet").Color,
	new BrickColor("Bright orange").Color,
	new BrickColor("Bright yellow").Color,
	new BrickColor("Light reddish violet").Color,
	new BrickColor("Brick yellow").Color,
];

export function computeNameColour(name: string) {
	let value = 0;
	for (let i = 1; i <= name.size(); i++) {
		let cValue = string.byte(name.sub(i, i))[0];
		let reverseIndex = name.size() - i + 1;
		if (name.size() % 2 === 1) reverseIndex--;
		if (reverseIndex % 4 >= 2) cValue = -cValue;
		value += cValue;
	}
	return NAME_COLOURS[value % NAME_COLOURS.size()];
}

export function getPlayerColour(speaker: Player) {
	if (speaker.Team) return speaker.TeamColor.Color;
	return computeNameColour(speaker.Name);
}
