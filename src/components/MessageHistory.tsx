/**
 * @file Implements the MessageHistory component which displays displays the
 * 		 chat log.
 * @license LGPL-3.0
 */

import Roact, { PureComponent } from "@rbxts/roact";
import { messageTypes } from "components/messageTypes";
import { TCMessageGroup } from "consts";

interface MessageHistoryProps {
	messages: TCMessageGroup[];
}

/**
 * Renders a scrolling list of historical chat messages.
 */
export class MessageHistory extends PureComponent<MessageHistoryProps, {}> {
	scrollRef = Roact.createRef<ScrollingFrame>();
	scrollBinding = Roact.createBinding(0);
	lastScroll = 0;
	// work around for ScrollingDirection being very broken
	// we use the size of the uilistlayout to determine the size of the
	// scrolling frame
	sizeBinding = Roact.createBinding(0);

	autoScroll() {
		if (!this.scrollRef.getValue()) return;
		const totalSize = this.scrollRef.getValue()!.AbsoluteCanvasSize.Y;
		const windowSize = this.scrollRef.getValue()!.AbsoluteWindowSize.Y;
		if (this.scrollBinding[0].getValue() > this.lastScroll - 5) {
			const newScroll = totalSize - windowSize;
			this.scrollBinding[1](newScroll);
			this.lastScroll = newScroll;
		}
	}
	calculateSize(list: UIListLayout) {
		this.sizeBinding[1](list.AbsoluteContentSize.Y);
		this.autoScroll();
	}
	didMount() {
		this.autoScroll();
	}
	shouldUpdate() {
		return true;
	}
	render() {
		return (
			<scrollingframe
				Key="ChatHistory"
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				AutomaticCanvasSize={Enum.AutomaticSize.Y}
				BottomImage="rbxasset://textures/ui/Scroll/scroll-middle.png"
				ScrollBarThickness={2}
				TopImage="rbxasset://textures/ui/Scroll/scroll-middle.png"
				BorderSizePixel={0}
				CanvasSize={this.sizeBinding[0].map((y) => new UDim2(0, 0, 0, y))}
				CanvasPosition={this.scrollBinding[0].map((v) => new Vector2(0, v))}
				Ref={this.scrollRef}
				Change={{
					CanvasPosition: (v) => this.scrollBinding[1](v.CanvasPosition.Y),
				}}
			>
				<uilistlayout
					VerticalAlignment={Enum.VerticalAlignment.Bottom}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={new UDim(0, 4)}
					Change={{ AbsoluteContentSize: (list) => this.calculateSize(list) }}
				></uilistlayout>
				{(this.props.messages || []).map((message) => {
					const def = messageTypes.get(message.type);
					if (def) {
						return Roact.createElement(def.renderer, {
							messageGroup: message,
						});
					} else {
						return (
							<textlabel
								Key={message.id}
								Size={new UDim2(1, 0, 0, 18)}
								Text={`No message type definition for '${message.type}'.`}
							></textlabel>
						);
					}
				})}
			</scrollingframe>
		);
	}
}
