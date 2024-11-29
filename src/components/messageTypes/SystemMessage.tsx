/**
 * @file Implements the SystemMessage message type component which renders a
 * 	     message from the server as a single textbox.
 * @license LGPL-3.0
 */

import Roact, { PureComponent } from "@rbxts/roact";
import { AutoResizeLabel } from "components/AutoResizeTextLabel";
import configuration from "configuration";
import { chatMessageGroupRendererProps } from "consts";
import { localizeFormattedMessage } from "logic/Localization";

export class SystemMessageRenderer extends PureComponent<chatMessageGroupRendererProps, {}> {
	render() {
		return (
			<>
				{this.props.messageGroup.messages.map((message, index) => {
					return (
						<AutoResizeLabel
							Key={this.props.messageGroup.id}
							Text={
								message.message
									? localizeFormattedMessage(message.message)
									: "length" in message
									? "_".rep(message.length)
									: ""
							}
							BackgroundTransparency={1}
							Font={(message.extraData && message.extraData.Font) || configuration.fontSystem}
							TextSize={(message.extraData && message.extraData.TextSize) || 14}
							TextStrokeColor3={new Color3()}
							TextStrokeTransparency={0}
							TextColor3={(message.extraData && message.extraData.ChatColor) || new Color3(1, 1, 1)}
							Size={new UDim2(1, 0, 1, 0)}
							TextXAlignment={Enum.TextXAlignment.Left}
							LayoutOrder={this.props.messageGroup.id}
						/>
					);
				})}
			</>
		);
	}
}
