const vscode = require("vscode");
const fs = require("fs");
const { getConfigPath } = require("./path");

function checkConfig() {
	if (fs.existsSync(getConfigPath())) {
		vscode.window.showInformationMessage("MultiTerminal: Config File Exists");

	} else {
		vscode.window.showErrorMessage("MultiTerminal: Config File Doesn't Exist");
		vscode.window.showInformationMessage("MultiTerminal: Adding Default config");
		fs.writeFileSync(getConfigPath(),`
		{
			"shellPath": "bash",
			"terminals": [
				{ "name": "Terminal 1", "command": "echo 1" },
				{ "name": "Terminal 2", "command": "echo 2" },
				{ "name": "Terminal 3", "command": "echo 3" }
			]
		}
		`)
	}
}

function getConfigData() {
	let data =  fs.readFileSync(getConfigPath(), "utf-8");
	return JSON.parse(data)
}

function startTerminals(terminals) {
	return vscode.commands.registerCommand("multiterminal.start", function () {
		//Send Message to Window
		vscode.window.showInformationMessage("MultiTerminal: Start Terminals");

		//Checks
		checkConfig();

		//Read Config File
		let configData = getConfigData();
		console.log(getConfigData())

		let shellPath = configData.shellPath;
		for (let i in configData.terminals) {
			let terminalName = configData.terminals[i].name;
			let terminalCommand = configData.terminals[i].command;
			let terminal = vscode.window.createTerminal(terminalName, shellPath);
			terminal.sendText(terminalCommand);

			terminals.push(terminal);
		}
	});
}

function splitTerminals(terminals) {
	return vscode.commands.registerCommand("multiterminal.split", function () {
		//Send Message to Window
		vscode.window.showInformationMessage("MultiTerminal: Split Terminals");

		//Read Config File
		let configData = getConfigData();
		let shellPath = configData.shellPath;
		let mainTerminal;
		for (let i in configData.terminals) {
			if (i == 0) {
				let terminalName = configData.terminals[i].name;
				let terminalCommand = configData.terminals[i].command;
				let terminal = vscode.window.createTerminal(terminalName, shellPath);
				mainTerminal = terminal;
				terminal.sendText(terminalCommand);
				terminals.push(terminal);
			} else {
				let terminalName = configData.terminals[i].name;
				let terminalCommand = configData.terminals[i].command;
				let terminal = vscode.window.createTerminal({
					name: terminalName,
					shellPath: shellPath,
					location: { parentTerminal: mainTerminal },
				});
				terminal.sendText(terminalCommand);
				terminals.push(terminal);
			}
		}
	});
}

function stopTerminals(terminals) {
	return vscode.commands.registerCommand("multiterminal.stop", function () {
		//Send Message to Window
		vscode.window.showInformationMessage("MultiTerminal: Stopped Terminals");
		for (let i in terminals) {
			terminals[i].dispose();
		}
	});
}
module.exports = { checkConfig, startTerminals, splitTerminals, stopTerminals };
