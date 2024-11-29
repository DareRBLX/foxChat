/**
 * @file Manages configuration for foxChat.

 * @license LGPL-3.0
 */

export interface TCConf {
	/* The font to use for user chat messages */
	font?: Enum.Font;
	/* The font to use for system chat messages */
	fontSystem?: Enum.Font;
	/* The text shown when there are users typing */
	typingText?: string;
	/* The background image of the chat bubble */
	chatBubbleImage?: string;
	/* The maximum length of a chat message */
	maxChatLength?: number;
	/* Allow a markdown-like syntax to be rendered with Roblox' rich text system.
	 * Implemented: **bold**, *italic*, __underline__, ~~strikethrough~~, `monospace`
	 */
	allowMarkdown?: boolean;
}

class TCConfiguration implements TCConf {
	font: Enum.Font = Enum.Font.Gotham;
	fontSystem: Enum.Font = Enum.Font.GothamBold;
	typingText = "typing...";
	chatBubbleImage = "rbxassetid://7539730337";
	maxChatLength = 200;
	allowMarkdown = true;
	yeetDefaultChatGuiIntoOrbit = false;
	load(config: TCConf): void {
		if (config.font) this.font = config.font;
		if (config.fontSystem) this.fontSystem = config.fontSystem;
		if (config.typingText) this.typingText = config.typingText;
		if (config.chatBubbleImage) this.chatBubbleImage = config.chatBubbleImage;
		if (config.maxChatLength) this.maxChatLength = config.maxChatLength;
		if (config.allowMarkdown) this.allowMarkdown = config.allowMarkdown;
	}
}
export default new TCConfiguration();
