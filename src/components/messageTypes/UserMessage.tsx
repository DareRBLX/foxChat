/**
 * @file Implements the UserMessage chat type component, which displays a
 * 		 single chat bubble from a regular user.
 * @license LGPL-3.0
 */

import Roact, { PureComponent } from "@rbxts/roact";
import { AutoResizeLabel } from "components/AutoResizeTextLabel";
import { ChatBubble } from "components/ChatBubble";
import { UserIconType } from "components/UserIcon";
import configuration from "configuration";
import { chatMessageGroupRendererProps } from "consts";
import mdToRichText from "logic/MDConversion";

export class UserMessageRenderer extends PureComponent<chatMessageGroupRendererProps, {}> {
	// TODO: Optimize this
	shouldUpdate() {
		return true;
	}
	render() {
		let label = "";
		if (this.props.messageGroup.sender.displayName) label = this.props.messageGroup.sender.displayName + "@";
		label += this.props.messageGroup.sender.username;
		if (this.props.messageGroup.sender.tags)
			for (const tag of this.props.messageGroup.sender.tags) label += " [" + tag + "]";
		if (this.props.messageGroup.channel !== "All" && this.props.messageGroup.channel !== "RBXGeneral") {
			if (this.props.messageGroup.channel.sub(0, 3) === "To ") label = "Whisper from " + label;
			else label += " | " + this.props.messageGroup.channel;
		}

		let icontype = UserIconType.Normal;
		if (this.props.messageGroup.channel === "Team") icontype = UserIconType.Team;
		if (this.props.messageGroup.channel.sub(0, 3) === "To ") icontype = UserIconType.Whisper;

		return (
			<ChatBubble
				sendingUser={tostring(this.props.messageGroup.sender.userId)}
				sendingUserIcon={icontype}
				sendingUserColour={this.props.messageGroup.sender.colour}
				Key={this.props.messageGroup.id}
				LayoutOrder={this.props.messageGroup.id}
			>
				{this.props.messageGroup.messages.map((message, index) => {
					return (
						<AutoResizeLabel
							Key={message.id}
							Text={
								message.message
									? configuration.allowMarkdown
										? mdToRichText(message.message)
										: message.message
									: "length" in message
									? "_".rep(message.length)
									: ""
							}
							BackgroundTransparency={1}
							Font={(message.extraData && message.extraData.Font) || configuration.font}
							TextSize={(message.extraData && message.extraData.TextSize) || 14}
							Size={new UDim2(1, 0, 1, 0)}
							TextColor3={
								// Team chat is excluded from having a custom colour, as rbxChat ensures that the text colour is always the same colour as the team colour
								// However, we want the background to be the same colour as the team colour.
								// And if we did both, the text would be the same colour as the background.
								(message.extraData &&
									(icontype !== UserIconType.Team ||
										message.extraData.ChatColor !== this.props.messageGroup.sender.colour) &&
									message.extraData.ChatColor) ||
								new Color3(1, 1, 1)
							}
							TextXAlignment={Enum.TextXAlignment.Left}
							LayoutOrder={message.id}
							RichText={true}
						/>
					);
				})}
				<AutoResizeLabel
					Key="SenderLabel"
					Text={label}
					BackgroundTransparency={1}
					Font={configuration.font}
					Size={new UDim2(1, 0, 1, 0)}
					TextSize={11}
					TextTransparency={0.5}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextColor3={new Color3(1, 1, 1)}
					LayoutOrder={99999}
					RichText={true}
				/>
			</ChatBubble>
		);
	}
}
