/**
 * @file Implements a function to convert a markdown string to a RichText
 *       string.
 * @license LGPL-3.0
 */
export default function mdToRichText(markdown: string): string {
	// Sanitize the markdown string.
	markdown = markdown.gsub("&", "&amp;")[0];
	markdown = markdown.gsub("<", "&lt;")[0];
	markdown = markdown.gsub(">", "&gt;")[0];
	markdown = markdown.gsub("'", "&apos;")[0];
	markdown = markdown.gsub('"', "&quot;")[0];

	// Replace markdown syntax with RichText syntax.
	markdown = markdown.gsub("%*%*(.-)%*%*", "<b>%1</b>")[0];
	markdown = markdown.gsub("%*(.-)%*", "<i>%1</i>")[0];
	markdown = markdown.gsub("__(.-)__", "<u>%1</u>")[0];
	markdown = markdown.gsub("~~(.-)~~", "<s>%1</s>")[0];
	markdown = markdown.gsub("`(.-)`", '<font face="RobotoMono">%1</font>')[0];

	return markdown;
}
