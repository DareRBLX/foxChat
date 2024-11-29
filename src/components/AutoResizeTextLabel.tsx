/**
 * @file Implements the AutoResizeTextLabel component, which is a text label
 * 		 that fills its parent container, horizontally, but resizes vertically
 * 		 to fit its contents.
 * @license LGPL-3.0
 */

import Roact, { PureComponent } from "@rbxts/roact";
import { TextService } from "@rbxts/services";

interface TextLabelProperties extends Partial<TextLabel> {}

export class AutoResizeLabel extends PureComponent<TextLabelProperties, {}> {
	textlabelRef = Roact.createRef<TextLabel>();
	sizeBinding = Roact.createBinding(18);
	didMount() {
		this.calculateSize();
	}
	calculateSize() {
		if (!this.textlabelRef.getValue()) return false;
		const textlabel = this.textlabelRef.getValue()!;
		let text = textlabel.Text;
		if (textlabel.RichText) {
			// Remove all formatting tags
			text = text.gsub("<(.-)>(.-)</(.-)>", "%2")[0];

			// Unescape HTML entities
			text = text.gsub("&lt;", "<")[0];
			text = text.gsub("&gt;", ">")[0];
			text = text.gsub("&amp;", "&")[0];
			text = text.gsub("&quot;", '"')[0];
			text = text.gsub("&apos;", "'")[0];
		}
		const textSize = TextService.GetTextSize(
			text,
			textlabel.TextSize,
			textlabel.Font,
			new Vector2(textlabel.AbsoluteSize.X, math.huge),
		);
		this.sizeBinding[1](textSize.Y);
	}
	render() {
		return (
			<textlabel
				{...this.props}
				Size={this.sizeBinding[0].map((y) => {
					return new UDim2(1, 0, 0, y);
				})}
				TextWrap={true}
				Change={{ AbsoluteSize: () => this.calculateSize(), TextBounds: () => this.calculateSize() }}
				Ref={this.textlabelRef}
			></textlabel>
		);
	}
}
