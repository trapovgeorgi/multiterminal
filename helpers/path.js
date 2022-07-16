const vscode = require("vscode");

function getConfigPath() {
	let currentPath = vscode.workspace.workspaceFolders[0].uri.path;
	let configPath = currentPath + "/multiterminal.json";
    return configPath
}

module.exports = { getConfigPath };
