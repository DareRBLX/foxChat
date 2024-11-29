/**
 * @file Implements the ChatBubble component which implements a chat bubble,
 * 		 with a user icon, but no contents.
 * @license LGPL-3.0
 */

import Roact, { Component } from "@rbxts/roact";
import configuration from "configuration";
import { UserIcon, UserIconType } from "./UserIcon";

interface chatBubbleSenderProps {
	sendingUser: string;
	sendingUserIcon: UserIconType;
	sendingUserColour?: Color3;
	LayoutOrder?: number;
	ref?: Roact.Ref<ImageLabel>;
}

/**
 * Renders a chat bubble, with no contents.
 * This will include a UIListLayout, which will be used to position the contents.
 * The height of the bubble is determined by the height of the contents, as indicated by a UIListLayout.
 * This element will always fill the entire width of the parent.
 */
export class ChatBubble extends Component<chatBubbleSenderProps, {}> {
	listLayoutRef = Roact.createRef<UIListLayout>();
	sizeBinding = Roact.createBinding(0);
	didMount() {
		this.calculateSize();
	}
	calculateSize() {
		if (!this.listLayoutRef.getValue()) return false;
		this.sizeBinding[1](this.listLayoutRef.getValue()!.AbsoluteContentSize.Y);
		this.setState({});
	}
	shouldUpdate() {
		return true;
	}
	render() {
		let backcolor = new Color3();
		if (this.props.sendingUserIcon === UserIconType.Whisper) backcolor = new Color3(0.5, 0.5, 0.5);
		else if (this.props.sendingUserIcon === UserIconType.Team)
			backcolor = this.props.sendingUserColour || new Color3(0.25, 0.25, 0.25);
		return (
			<frame
				Key="ChatBubble"
				BackgroundTransparency={1}
				Size={this.sizeBinding[0].map((v) => new UDim2(1, 0, 0, v + 12))}
				LayoutOrder={this.props.LayoutOrder}
			>
				<UserIcon
					type={this.props.sendingUserIcon}
					user={this.props.sendingUser}
					size={new UDim2(0, 22, 0, 22)}
					position={new UDim2(0, 0, 1, 0)}
					anchor={new Vector2(0, 1)}
					colour={this.props.sendingUserColour}
				></UserIcon>
				<imagelabel
					Key="ChatBubbleBackground"
					BackgroundTransparency={1}
					Image={configuration.chatBubbleImage}
					Position={new UDim2(0, 24, 0, 0)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, -24, 1, 0)}
					SliceCenter={new Rect(52, 125, 52, 125)}
					SliceScale={0.2}
					ImageColor3={backcolor}
					ImageTransparency={0.5}
					Ref={this.props.ref}
				>
					<frame Size={new UDim2(1, -12, 1, -12)} Position={new UDim2(0, 6, 0, 6)} BackgroundTransparency={1}>
						<uilistlayout
							Padding={new UDim(0, 4)}
							Ref={this.listLayoutRef}
							SortOrder={Enum.SortOrder.LayoutOrder}
							Change={{
								AbsoluteContentSize: () => this.calculateSize(),
							}}
						></uilistlayout>
						{this.props[Roact.Children]}
					</frame>
				</imagelabel>
			</frame>
		);
	}
}
