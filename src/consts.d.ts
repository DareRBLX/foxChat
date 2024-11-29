/**
 * @file Provides type definitions for objects & interfaces used by foxChat.
 * @license LGPL-3.0
 */

import { ExtraData, MessageType } from "@rbxts/chat-service";

export interface DefaultUIElementProps {
	size?: UDim2;
	position?: UDim2;
	constraint?: Enum.SizeConstraint;
	anchor?: Vector2;
}

interface TCSender {
	userId: number;
	username: string;
	displayName?: string;
	tags: string[];
	colour?: Color3;
}
type TCMessage = {
	id: number;
	message?: string;
	timestamp: number;
	extraData: ExtraData;
} & (
	| {
			rbxId: number;
			length: number;
			filtered: boolean;
	  }
	| {
			rbxId: string;
			status: Enum.TextChatMessageStatus;
	  }
);
interface TCMessageGroup {
	id: number;
	type: MessageType;
	channel: string;
	sender: TCSender;
	messages: TCMessage[];
	timestamp: number;
}

interface RBXChatMessage {
	ID: number;

	FromSpeaker: string;
	SpeakerDisplayName?: string;
	SpeakerUserId: number;

	OriginalChannel: string;

	MessageLength: number;
	MessageLengthUtf8: number;
	MessageType: MessageType;
	IsFiltered: boolean;
	Message?: string;

	Time: number;
	ExtraData: ExtraData;
}
export interface SetCoreSystemMessage {
	Text: string;
	Color?: Color3;
	Font?: Enum.Font;
	TextSize?: number;
}

interface chatMessageGroupRendererProps {
	messageGroup: TCMessageGroup;
}

interface TCSayMessageRequest {
	message: string;
}

export interface TCChatInterop {
	messageHistory: TCMessageGroup[];
	handleMessageRequest(msg: TCSayMessageRequest): void;

	isVisible(): boolean;
	canSend(): boolean;

	on(event: "messagesUpdate", callback: () => void): void;
	on(event: "visibilityChange", callback: () => void): void;
	on(event: "sendAbilityChange", callback: () => void): void;
	on(event: "setPosition", callback: (pos: UDim2) => void): void;
	on(event: "setSize", callback: (size: UDim2) => void): void;
}
