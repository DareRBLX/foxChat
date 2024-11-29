/**
 * @file A Hoarcekat story that shows a user's icon.
 * @license LGPL-3.0
 */

import Roact from "@rbxts/roact";
import { UserIcon, UserIconType } from "components/UserIcon";

export default function UserIconStory(target: GuiObject) {
	const tree = Roact.mount(
		<frame>
			<uilistlayout></uilistlayout>
			<UserIcon user="47757673" type={UserIconType.Normal} size={new UDim2(0, 22, 0, 22)} />
			<UserIcon user="47757673" type={UserIconType.Whisper} size={new UDim2(0, 22, 0, 22)} />

			<UserIcon user="47757673" type={UserIconType.Normal} size={new UDim2(0, 16, 0, 16)} />
			<UserIcon user="47757673" type={UserIconType.Whisper} size={new UDim2(0, 16, 0, 16)} />
		</frame>,
		target,
	);
	return () => Roact.unmount(tree);
}
