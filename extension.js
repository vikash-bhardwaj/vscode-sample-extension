// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const getUncommittedFiles = require("./src/utils");

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
	 * Command to demo the GIT Integration
	 * Command will find all uncommitted files from GIT and show in QuickPick List
	 * Selecting the file will open that file in the editor
	 */
	let gitUntrackedFilesDisposable = vscode.commands.registerCommand('extension.showUncommittedFiles', async () => {
		const files = await getUncommittedFiles(vscode);
		vscode.window.showQuickPick(files, {
			placeHolder: 'Select an uncommitted file to open',
		}).then(selectedFile => {
			if (selectedFile) {
				vscode.window.showTextDocument(vscode.Uri.file(selectedFile));
			}
		});
	});

	context.subscriptions.push(
		disposable,
		gitUntrackedFilesDisposable
	);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
