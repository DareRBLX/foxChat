/**
 * @file Implements the TypingIndicator component which displays a typing
 * 		 indicator and voice chat indicator.
 * @license LGPL-3.0
 */
import Roact, { PureComponent } from "@rbxts/roact";
import configuration from "configuration";
import { DefaultUIElementProps } from "consts";
import { UserIcon, UserIconType } from "./UserIcon";

interface typingIndicatorProps extends DefaultUIElementProps {
	typingUsers: string[];
}

export class TypingIndicator extends PureComponent<typingIndicatorProps, {}> {
	render() {
		return (
			<frame
				Key="TypingIndicator"
				BackgroundTransparency={1}
				LayoutOrder={1}
				AnchorPoint={this.props.anchor || new Vector2(0, 1)}
				SizeConstraint={this.props.constraint || Enum.SizeConstraint.RelativeXY}
				Position={this.props.position || new UDim2(0, 0, 1, 0)}
				Size={this.props.size || new UDim2(1, 0, 0, 16)}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, 2)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				{this.props.typingUsers.map((user) => (
					<UserIcon
						Key={user}
						user={user}
						constraint={Enum.SizeConstraint.RelativeYY}
						type={UserIconType.Normal}
					></UserIcon>
				))}

				{this.props.typingUsers.size() !== 0 && (
					<textlabel
						Key="TypingLabel"
						BackgroundTransparency={1}
						LayoutOrder={99999999}
						Position={new UDim2(-0.003, 0, -0.125, 0)}
						Size={new UDim2(1, 0, 1, 0)}
						Text="typing..."
						TextScaled={true}
						Font={configuration.fontSystem}
						TextSize={14}
						TextStrokeColor3={new Color3()}
						TextStrokeTransparency={0}
						TextColor3={new Color3(1, 1, 1)}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
				)}
			</frame>
		);
	}
}
