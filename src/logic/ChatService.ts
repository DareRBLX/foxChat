/**
 * @file Contains the main logic for interacting with the Roblox TextChatService.
 * @license LGPL-3.0
 */

import { MessageType } from "@rbxts/chat-service";
import { Players, TextChatService } from "@rbxts/services";
import { messageTypes } from "components/messageTypes/index.js";
import { TCChatInterop, TCMessage, TCMessageGroup, TCSayMessageRequest } from "consts";
import { TCEventListener } from "./EventListener";

export class TCChatServiceInterop extends TCEventListener implements TCChatInterop {
	public messageHistory: TCMessageGroup[] = [];

	private chatChannels = TextChatService.WaitForChild("TextChannels") as Folder;

	constructor() {
		super();
		TextChatService.MessageReceived.Connect((message) => this.handleIncomingMessage(message));
	}
	private currentMessageId = 0;
	private currentGroupId = 0;

	private handleIncomingMessage(msg: TextChatMessage) {
		const latest = this.messageHistory[this.messageHistory.size() - 1];
		// Decides if the message should be added to the current group or a new group should be created.
		const msgType: MessageType = !msg.TextSource ? "System" : "Message";
		const uid = msg.TextSource?.UserId || 0;
		const channel = msg.TextChannel?.Name;
		const cont =
			latest &&
			latest.channel === channel &&
			latest.type === msgType &&
			messageTypes.has(msgType) &&
			messageTypes.get(msgType)!.groupable &&
			latest.sender.userId === uid &&
			latest.sender.displayName === msg.PrefixText;
		let group;
		const message: TCMessage = {
			id: this.currentMessageId++,
			rbxId: msg.MessageId,
			message: msg.Text,
			status: msg.Status,
			timestamp: msg.Timestamp.UnixTimestamp,
			extraData: {
				ChatColor: msg.ChatWindowMessageProperties?.TextColor3,
				// Font: msg.ChatWindowMessageProperties?.FontFace,
				Tags: msg.PrefixText ? [{ TagText: msg.PrefixText }] : [],
				TextSize: msg.ChatWindowMessageProperties?.TextSize,
			},
		};
		if (cont) {
			// Add the message to the current group.
			latest.messages.push(message);
			group = latest;
		} else {
			message.id = 0;
			this.currentMessageId = 1;
			group = {
				id: this.currentGroupId++,
				type: msgType,
				channel,
				sender: {},
				messages: [message],
				timestamp: msg.Timestamp.UnixTimestamp,
			} as TCMessageGroup;
		}
		group.sender ??= {} as any; // set it to an empty object and fill it in later
		group.sender.userId = uid;
		group.sender.username = msg.TextSource?.Name || "";
		group.sender.tags ??= [];
		group.sender.displayName = msg.PrefixText;
		this.messageHistory[group.id] = group;
		this.emit("messagesUpdate");
	}
	handleMessageRequest(msg: TCSayMessageRequest) {
		const [channel] = this.getDefaultChannel();
		channel.SendAsync(msg.message);
	}

	private findSourceInChannelForPlayer(channel: TextChannel, playerId: number) {
		for (const source of channel.GetChildren()) {
			if (source.IsA("TextSource") && source.UserId === playerId) return source;
		}
	}
	/**
	 * @returns [channel: TextChannel, canSend: boolean]
	 */
	private getDefaultChannel() {
		const localPlayer = Players.LocalPlayer.UserId;
		const rbxGeneral = this.chatChannels.FindFirstChild("RBXGeneral") as TextChannel;
		const rbxGeneralSource = this.findSourceInChannelForPlayer(rbxGeneral, localPlayer);
		if (rbxGeneralSource && rbxGeneralSource.CanSend) return [rbxGeneral, true] as const;
		let roChannel = rbxGeneral;
		let roSource = rbxGeneralSource;
		for (const channel of this.chatChannels.GetChildren()) {
			if (channel.IsA("TextChannel")) {
				roChannel = channel;
				roSource = this.findSourceInChannelForPlayer(channel, localPlayer);
				if (roSource?.CanSend) break;
				break;
			}
		}
		return [roChannel, (roSource && roSource.CanSend) || false] as const;
	}

	// TODO: Optimise so we cache the defaultChannel in some way.
	isVisible(): boolean {
		return !!this.getDefaultChannel()[0];
	}
	canSend(): boolean {
		return this.getDefaultChannel()[1];
	}
}
