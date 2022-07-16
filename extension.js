const { startTerminals, splitTerminals, stopTerminals } = require("./helpers/terminal");
const { createStatusBarStartButton, createStatusBarSplitButton, createStatusBarStopButton } = require("./helpers/views");

let terminals = []

function activate(context) {
	createStatusBarStartButton()
	createStatusBarSplitButton()
	createStatusBarStopButton()

	let startCommand = startTerminals(terminals)
	let splitCommand = splitTerminals(terminals)
	let stopCommand = stopTerminals(terminals)

	context.subscriptions.push(startCommand);
	context.subscriptions.push(splitCommand);
	context.subscriptions.push(stopCommand);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
