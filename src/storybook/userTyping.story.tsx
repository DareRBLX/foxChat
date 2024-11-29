/**
 * @file A Hoarcekat story that shows the users typing area.
 * @license LGPL-3.0
 */

import Roact from "@rbxts/roact";
import { TypingIndicator } from "components/TypingIndicator";

export default function UserIconStory(target: GuiObject) {
	const users = [];
	for (let i = 0; i < math.random(0, 4); i++) {
		users.push("47757673");
	}
	const tree = Roact.mount(<TypingIndicator typingUsers={users} />, target);
	return () => Roact.unmount(tree);
}
