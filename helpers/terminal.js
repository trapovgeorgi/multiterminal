const vscode = require("vscode");
const fs = require("fs");
const { getConfigPath } = require("./path");

function checkConfig() {
	let configPath = getConfigPath();
	let configData;
	fs.readFile(configPath, "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		if (data == "") {
			console.log("VERI BAD");
			return;
		}
		configData = JSON.parse(data);
	});
	console.log(configData);
}

function startTerminals(terminals) {
	return vscode.commands.registerCommand(
		"multiterminal.start",
		function () {
			//Send Message to Window
			vscode.window.showInformationMessage("MultiTerminal just ran!");

			//Checks
			checkConfig();

			//Read Config File
			let configPath = getConfigPath();
			let configData;
			vscode.workspace.openTextDocument(configPath).then((document) => {
				configData = JSON.parse(document.getText());
				let shellPath = configData.shellPath;
				for (let i in configData.terminals) {
					let terminalName = configData.terminals[i].name;
					let terminalCommand = configData.terminals[i].command;
					let terminal = vscode.window.createTerminal(terminalName, shellPath);
					terminal.sendText(terminalCommand);

					terminals.push(terminal)
				}
			});
		}
	);
}

function splitTerminals(terminals) {
	return vscode.commands.registerCommand(
		"multiterminal.split",
		function () {
			//Send Message to Window
			vscode.window.showInformationMessage("MultiTerminal just ran split!");

			//Read Config File
			let configPath = getConfigPath();
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
						terminals.push(terminal)

					} else {
						let terminalName = configData.terminals[i].name;
						let terminalCommand = configData.terminals[i].command;
						let terminal = vscode.window.createTerminal({
							name: terminalName,
							shellPath: shellPath,
							location: { parentTerminal: mainTerminal },
						});
						terminal.sendText(terminalCommand);
						terminals.push(terminal)
					}
				}
			});
		}
	);
}

function stopTerminals(terminals) {
	return vscode.commands.registerCommand(
		"multiterminal.stop",
		function () {
			//Send Message to Window
			vscode.window.showInformationMessage("Stop TERMINALS");
			for(let i in terminals){
				terminals[i].dispose()
			}
		}
	);
}
module.exports = { checkConfig, startTerminals, splitTerminals, stopTerminals };
