function getWebviewContent() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Color Picker</title>
</head>
<body>
    <input type="color" id="colorPicker">
    <button onclick="insertColor()">Insert Color</button>

    <script>
        const vscode = acquireVsCodeApi();
        function insertColor() {
            const color = document.getElementById('colorPicker').value;
            vscode.postMessage({
                command: 'insertColor',
                color: color
            });
        }
    </script>
</body>
</html>`;
}

module.exports = getWebviewContent;
