/**
 * @file A Hoarcekat story that shows a chat bubble.
 * @license LGPL-3.0
 */

import Roact from "@rbxts/roact";
import { ChatBubble } from "components/ChatBubble";
import { UserIconType } from "components/UserIcon";

export default function UserIconStory(target: GuiObject) {
	const tree = Roact.mount(
		<frame Size={target.Size}>
			<uilistlayout Padding={new UDim(0, 4)}></uilistlayout>
			<ChatBubble sendingUser="47757673" sendingUserIcon={UserIconType.Normal}>
				<textlabel
					Size={new UDim2(1, 0, 0, 15)}
					BackgroundColor={BrickColor.Red()}
					BorderSizePixel={0}
				></textlabel>
				<textlabel
					Size={new UDim2(1, 0, 0, 15)}
					BackgroundColor={BrickColor.Red()}
					BorderSizePixel={0}
				></textlabel>
			</ChatBubble>
			<ChatBubble sendingUser="47757673" sendingUserIcon={UserIconType.Normal}>
				<textlabel
					Size={new UDim2(1, 0, 1, 12)}
					BackgroundColor={BrickColor.Red()}
					BorderSizePixel={0}
				></textlabel>
			</ChatBubble>
		</frame>,
		target,
	);
	return () => Roact.unmount(tree);
}
