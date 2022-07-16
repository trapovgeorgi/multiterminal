const vscode = require("vscode");

function createStatusBarStartButton() {
	let button = vscode.window.createStatusBarItem(1, 1);
	button.text = "Start Terminals";
	button.command = "multiterminal.start";
	button.show();
}

function createStatusBarSplitButton() {
	let button = vscode.window.createStatusBarItem(1, 1);
	button.text = "Split Terminals";
	button.command = "multiterminal.split";
	button.show();
}

function createStatusBarStopButton() {
	let button = vscode.window.createStatusBarItem(1, 1);
	button.text = "Stop Terminals";
	button.command = "multiterminal.stop";
	button.show();
}


module.exports = { createStatusBarStartButton, createStatusBarSplitButton, createStatusBarStopButton };
