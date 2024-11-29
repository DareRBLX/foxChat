/**
 * @file A Hoarcekat story that shows a chatbox.
 * @license LGPL-3.0
 */

import Roact from "@rbxts/roact";
import { ChatBox } from "components/ChatBox";

export default function UserIconStory(target: GuiObject) {
	const tree = Roact.mount(
		<frame Size={target.Size}>
			<ChatBox OnChatted={print} />
		</frame>,
		target,
	);
	return () => Roact.unmount(tree);
}
