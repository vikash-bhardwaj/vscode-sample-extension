// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const colorNames = require("./src/colornames");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "colorpicker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('colorpicker.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from colorpicker!');
	});

	/**
	 * Command to demo simple inputbox to get a color name
	 * Entered color name will be inserted in current file cursor location
	 */
	let insertColorDisposable = vscode.commands.registerCommand('colorpicker.insertColor', function () {
		vscode.window.showInputBox({
			prompt: 'Enter a color (e.g., #FF0000 or red)',
			placeHolder: 'Color'
		}).then((color) => {
			if (color) {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					editor.edit((editBuilder) => {
						editBuilder.insert(editor.selection.start, color);
					});
				}
			}
		});
	});

	/**
	 * Command to demo little complex or dynamic color picker to get a color name
	 * This will be in form of a Dropdown list with filter inputbox
	 * Selected color name will be inserted in current file cursor location
	 */
	let insertColorWithPickerDisposable = vscode.commands.registerCommand('colorpicker.insertColorWithPicker', function () {
		vscode.window.showQuickPick(colorNames, {
			placeHolder: 'Choose a color',
			matchOnDescription: true,
			matchOnDetail: true
		}).then((selectedColor) => {
			if (selectedColor) {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					editor.edit((editBuilder) => {
						console.info("Color Picker :: Selected Color by user: ", selectedColor);
						editBuilder.insert(editor.selection.start, selectedColor.detail);
					});
				}
			}
		});
	});

	context.subscriptions.push(disposable, insertColorDisposable, insertColorWithPickerDisposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
