# foxChat (beta)

[![build](https://github.com/DareRBLX/foxChat/actions/workflows/build.yml/badge.svg?event=push)](https://github.com/DareRBLX/foxChat/actions/workflows/build.yml)

## [Visit the test place](https://www.roblox.com/games/7539728442/foxChat)

A modern chat UI for the Roblox chat system. Not fully complete yet, so expect bugs, bad code & missing features (but if you find them, please do tell!)

Built with Roact & roblox-ts.

## Features:

 - **Compatible**: foxChat is a drop-in replacement for the default Roblox chat GUI, implementing many of the same remote events and features, therefore features   as Player.Chatted, StarterGui:SetCore will work with this script, with other modifications.
 - **Modern**: Provides a more modern, bubble based look and feel.
 - **Formatting**: Supports a markdown-like syntax (\*\*bold\*\*, \*italic\*, \_\_underline\_\_, \~\~strikethrough\~\~, \`monospace\`) for formatting text. 
 - **Client only**: Due to the script piggie-backing on the Roblox chat system, this is a drop in replacement, on the client. (A server script will be required to provide typing statuses.)

## Todo:
- [ ] Typing indicator
- [ ] More animations
- [ ] Autocomplete
- [ ] Better command infrastructure
- [ ] Indicate filtered messages before send.

## Installation:

### With rbxm:

1. Visit the [actions](https://github.com/DareRBLX/foxChat/actions/workflows/build.yml?query=is%3Asuccess) page.
2. Select the latest build
3. On the action page, under Artifacts, download the foxchat artifact.
4. Unzip the downloaded zip file
5. Create a local script inside StarterGui, name it `foxChatLoader` or similar.
6. Copy the below loader code into the script
```lua
require(script.foxChat).loadFoxChat({},script.Parent)
game.Players.LocalPlayer:WaitForChild("PlayerGui"):WaitForChild("Chat").Enabled = false
```

7. Right click the local script in the explorer window
8. Select `Insert from file` and open the foxchat rbxm file you downloaded earlier.

### With npm:

Coming soon.

## Support

If you have a feature request or a bug report, please create an [issue](https://github.com/DareRBLX/foxChat/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).

If you need to ask me a question directly, [heres where to find me](https://robins.one)
