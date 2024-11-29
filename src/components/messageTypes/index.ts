/**
 * @file Implements the definitions for the message types.
 * @license LGPL-3.0
 */

import { SystemMessageRenderer } from "./SystemMessage";
import { UserMessageRenderer } from "./UserMessage";

interface MessageTypeDefinition {
	groupable: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	renderer: any;
}

export const messageTypes = new Map<string, MessageTypeDefinition>([
	[
		"Message",
		{
			groupable: true,
			renderer: UserMessageRenderer,
		},
	],
	[
		"System",
		{
			groupable: false,
			renderer: SystemMessageRenderer,
		},
	],
	[
		"Welcome",
		{
			groupable: false,
			renderer: SystemMessageRenderer,
		},
	],
	[
		"SetCore",
		{
			groupable: false,
			renderer: SystemMessageRenderer,
		},
	],
	[
		"Whisper",
		{
			groupable: true,
			renderer: UserMessageRenderer,
		},
	],
]);
