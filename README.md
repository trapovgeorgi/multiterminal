# multiterminal README

Extension for creating terminals with predefined commands 
## Setup
Example config in "multiterminal.json" file

    {
	    "shellPath": "bash",
	    "terminals": [
		    { "name": "Terminal 1", "command": "echo 1" },
		    { "name": "Terminal 2", "command": "echo 2" },
		    { "name": "Terminal 3", "command": "echo 3" }
	    ]
    }

## Features

   * Start seperate terminals
   * Split terminals for better readability
   * Stop terminals

   ![alt text](./images/buttons.png "Title")

## Commands in palette

    MultiTerminal Start
    MultiTerminal Split
    MultiTerminal Stop

## Release Notes

### 1.0.0

- Initial release of MultiTerminal

### 1.0.1

- Added Setup Example

### 1.1.0

- Added Stop command
- refactoring of code
- checks for config

-----------------------------------------------------------------------------------------------------------


**Enjoy!**
