/**
 * @file Provides the main entry point for foxChat.
 * @license LGPL-3.0
 */

import Roact from "@rbxts/roact";
import { FoxChat } from "components/ChatCore";
import configuration, { TCConf } from "configuration";

function loadChatInternal(name: "tayChat" | "foxChat", config: TCConf, mount: GuiBase | GuiObject | BasePlayerGui) {
	configuration.load(config);
	return Roact.mount(
		mount.IsA("BasePlayerGui") ? (
			<screengui ResetOnSpawn={false}>
				<FoxChat></FoxChat>
			</screengui>
		) : (
			<FoxChat></FoxChat>
		),
		mount,
		name,
	);
}

export function loadFoxChat(config: TCConf, mount: GuiBase | GuiObject | BasePlayerGui) {
	loadChatInternal("foxChat", config, mount);
}

/**
 * @deprecated Use `loadFoxChat` instead.
 */
export function loadTayChat(config: TCConf, mount: GuiBase | GuiObject | BasePlayerGui) {
	warn("loadTayChat is deprecated. Use loadFoxChat instead. Note - this will rename the ScreenGui to foxChat.");
	loadChatInternal("tayChat", config, mount);
}
