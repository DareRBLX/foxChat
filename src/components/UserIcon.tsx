/**
 * @file Implements the UserIcon component which displays a user's icon
 * 		 additional overlays and background color.
 * @license LGPL-3.0
 */

import Roact, { PureComponent } from "@rbxts/roact";
import { DefaultUIElementProps } from "consts";

export enum UserIconType {
	Normal,
	Whisper,
	Team,
}

interface UserIconProps extends DefaultUIElementProps {
	user: string;
	type?: UserIconType;
	colour?: Color3;
}

export class UserIcon extends PureComponent<UserIconProps, {}> {
	render() {
		const extras = this.props.type === UserIconType.Whisper && (
			<imagelabel
				Key="Shhhh"
				BackgroundTransparency={1}
				Image="rbxassetid://7547619529"
				Size={new UDim2(1, 0, 1, 0)}
			/>
		);
		return (
			<imagelabel
				Key={"UserIcon_" + this.props.user}
				BackgroundColor3={this.props.colour || Color3.fromRGB(255, 255, 255)}
				BorderSizePixel={0}
				Image={"rbxthumb://type=AvatarHeadShot&id=" + this.props.user + "&w=48&h=48"}
				Position={this.props.position || new UDim2(0, 0, 0, 0)}
				Size={this.props.size || new UDim2(1, 0, 1, 0)}
				SizeConstraint={this.props.constraint || Enum.SizeConstraint.RelativeXY}
				AnchorPoint={this.props.anchor || new Vector2(0, 0)}
			>
				{extras}
				<uicorner CornerRadius={new UDim(1, 0)} />
			</imagelabel>
		);
	}
}
