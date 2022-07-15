const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "multiterminal" is now active!');

	let startCommand = vscode.commands.registerCommand(
		"multiterminal.start",
		function () {
			//Send Message to Window
			vscode.window.showInformationMessage("MultiTerminal just ran!");

			//Read Config File
			let currentPath = vscode.workspace.workspaceFolders[0].uri.path;
			let configPath = currentPath + "/multiterminal.json";
			let configData;
			vscode.workspace.openTextDocument(configPath).then((document) => {
				configData = JSON.parse(document.getText());
				let shellPath = configData.shellPath;
				for (let i in configData.terminals) {
					let terminalName = configData.terminals[i].name;
					let terminalCommand = configData.terminals[i].command;
					let terminal = vscode.window.createTerminal(terminalName, shellPath);
					terminal.sendText(terminalCommand);
				}
			});
		}
	);

	let splitCommand = vscode.commands.registerCommand(
		"multiterminal.split",
		function () {
			//Send Message to Window
			vscode.window.showInformationMessage("MultiTerminal just ran split!");


			//Read Config File
			let currentPath = vscode.workspace.workspaceFolders[0].uri.path;
			let configPath = currentPath + "/multiterminal.json";
			let configData;
			vscode.workspace.openTextDocument(configPath).then((document) => {
				configData = JSON.parse(document.getText());
				let shellPath = configData.shellPath;
				let mainTerminal;
				for (let i in configData.terminals) {
					if (i == 0) {
						let terminalName = configData.terminals[i].name;
						let terminalCommand = configData.terminals[i].command;
						let terminal = vscode.window.createTerminal(
							terminalName,
							shellPath
						);
						mainTerminal = terminal;
						terminal.sendText(terminalCommand);
					} else {
						
						let terminalName = configData.terminals[i].name;
						let terminalCommand = configData.terminals[i].command;
						let terminal = vscode.window.createTerminal({
							name: terminalName,
							shellPath: shellPath,
							location: { parentTerminal: mainTerminal },
						});
						console.log(mainTerminal.name);
						terminal.sendText(terminalCommand);
					}
				}
			});
		}
	);

	context.subscriptions.push(startCommand);
	context.subscriptions.push(splitCommand);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
