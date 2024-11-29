/**
 * @file Implements the ChatBox which displays a chat bubble which contains a
 * 		 text box, which can be used to send chat messages.
 * @license LGPL-3.0
 */

import Roact, { Component } from "@rbxts/roact";
import { Players, TextService, UserInputService } from "@rbxts/services";
import configuration from "configuration";
import { TCSayMessageRequest } from "consts";
import { getPlayerColour } from "logic/Util";
import { ChatBubble } from "./ChatBubble";
import { UserIconType } from "./UserIcon";

/**
 * Renders a chat bubble containing a chat box.
 * The height of the chatbox will be determined by the length of the message.
 * Will fire the 'Submit' event when the user sends the message.
 */
export class ChatBox extends Component<{ OnChatted: (message: TCSayMessageRequest) => void }, {}> {
	textboxRef = Roact.createRef<TextBox>();
	bubbleRef = Roact.createRef<ImageLabel>();
	sizeBinding = Roact.createBinding(24);

	connections: RBXScriptConnection[] = [];
	didMount() {
		this.filterText();
		this.calculateSize();
		this.connections.push(
			Players.LocalPlayer.GetAttributeChangedSignal("TeamColor").Connect(() => {
				print("requesting update!!!");
				wait();
				this.setState({});
			}),
		);
		this.connections.push(
			UserInputService.InputEnded.Connect((input, gameProcessed) => {
				if (gameProcessed) return;
				wait();
				if (input.KeyCode === Enum.KeyCode.Slash) this.textboxRef.getValue()!.CaptureFocus();
			}),
		);
	}
	willUnmount() {
		for (const connection of this.connections) connection.Disconnect();
	}
	previousText = "";
	filterText() {
		if (!this.textboxRef.getValue()) return false;
		const textbox = this.textboxRef.getValue()!;
		const text = textbox.Text;
		if ((utf8.len(utf8.nfcnormalize(text))[0] as number) > configuration.maxChatLength)
			textbox.Text = this.previousText;
	}
	calculateSize() {
		if (!this.textboxRef.getValue()) return false;
		const textbox = this.textboxRef.getValue()!;
		const textSize = TextService.GetTextSize(
			textbox.Text,
			textbox.TextSize,
			textbox.Font,
			new Vector2(textbox.AbsoluteSize.X, math.huge),
		);
		this.sizeBinding[1](textSize.Y + 6);
	}
	render() {
		return (
			<ChatBubble
				sendingUser={tostring(Players.LocalPlayer.UserId)}
				sendingUserIcon={UserIconType.Normal}
				sendingUserColour={getPlayerColour(Players.LocalPlayer)}
				ref={this.bubbleRef}
			>
				<textbox
					BackgroundTransparency={1}
					CursorPosition={-1}
					Font={Enum.Font.GothamBold}
					PlaceholderText="Send a message..."
					Text=""
					Position={new UDim2(0, 0, 0, -6)}
					Size={this.sizeBinding[0].map((t) => new UDim2(1, 0, 0, t))}
					TextColor3={new Color3(1, 1, 1)}
					TextSize={18}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextWrap={true}
					ClearTextOnFocus={false}
					Change={{
						Text: () => this.calculateSize(),
						AbsoluteSize: () => this.calculateSize(),
						TextBounds: () => this.calculateSize(),
					}}
					Event={{
						FocusLost: (tb, enterPressed, input) => {
							if (enterPressed || input.KeyCode === Enum.KeyCode.Escape) {
								const message = this.textboxRef.getValue()!.Text;
								this.textboxRef.getValue()!.Text = "";
								if (message.size() > 0 && enterPressed) this.props.OnChatted({ message });
							}
							this.textboxRef.getValue()!.TextColor3 = new Color3(1, 1, 1);
							this.bubbleRef.getValue()!.ImageColor3 = new Color3();
							this.bubbleRef.getValue()!.ImageTransparency = 0.5;
						},
						Focused: () => {
							this.textboxRef.getValue()!.TextColor3 = new Color3();
							this.bubbleRef.getValue()!.ImageColor3 = new Color3(1, 1, 1);
							this.bubbleRef.getValue()!.ImageTransparency = 0;
						},
					}}
					Ref={this.textboxRef}
				/>
			</ChatBubble>
		);
	}
}
