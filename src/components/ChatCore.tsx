/**
 * @file Implements the foxChat component, which displays the core chat GUI: MessageHistory, ChatBox & TypingIndicator.
 * @license LGPL-3.0
 */

import Roact, { Component } from "@rbxts/roact";
import { TextChatService } from "@rbxts/services";
import { TCChatInterop, TCMessageGroup } from "consts";
import { TCChatSystemInteraction } from "logic/ChatInteraction";
import { TCChatServiceInterop } from "logic/ChatService.js";
import { ChatBox } from "./ChatBox";
import { MessageHistory } from "./MessageHistory";

interface ChatProps {}
interface ChatState {
	messageHistory: TCMessageGroup[];
}

export class FoxChat extends Component<ChatProps, ChatState> {
	ChatInteraction: TCChatInterop = new (TextChatService.ChatVersion === Enum.ChatVersion.TextChatService
		? TCChatServiceInterop
		: TCChatSystemInteraction)();

	PositionBinding = Roact.createBinding(new UDim2(0, 0, 1, -200));
	SizeBinding = Roact.createBinding(new UDim2(0, 575, 0, 200));

	constructor(P: ChatProps) {
		super(P);
		this.ChatInteraction.on("messagesUpdate", () => {
			this.setState({
				messageHistory: this.ChatInteraction.messageHistory,
			});
		});
		this.ChatInteraction.on("visibilityChange", () => {
			wait();
			this.setState({});
		});
		this.ChatInteraction.on("setPosition", (pos) => this.PositionBinding[1](pos));
		this.ChatInteraction.on("setSize", (size) => this.SizeBinding[1](size));
		this.ChatInteraction.on("sendAbilityChange", () => {
			wait();
			this.setState({});
		});
	}
	didMount() {
		if (!this.state.messageHistory) this.setState({ messageHistory: this.ChatInteraction.messageHistory });
	}

	render() {
		return (
			<frame
				Key="foxChat"
				BackgroundTransparency={1}
				Size={this.SizeBinding[0]}
				ClipsDescendants={false}
				Position={this.PositionBinding[0]}
				Visible={this.ChatInteraction.isVisible()}
			>
				<uilistlayout
					VerticalAlignment={Enum.VerticalAlignment.Bottom}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={new UDim(0, 4)}
				></uilistlayout>
				<MessageHistory
					messages={this.state.messageHistory || this.ChatInteraction.messageHistory || []}
				></MessageHistory>
				{this.ChatInteraction.canSend() && (
					<ChatBox OnChatted={(m) => this.ChatInteraction.handleMessageRequest(m)}></ChatBox>
				)}
				{/*<TypingIndicator typingUsers={["47757673", "47757673", "47757673"]}></TypingIndicator>*/}
			</frame>
		);
	}
}
