async function getUncommittedFiles(vscode) {
    const gitExtension = vscode.extensions.getExtension('vscode.git').exports;
    const api = gitExtension.getAPI(1);
    const repo = api.repositories[0]; // Assuming there is at least one repository

    const uncommittedFiles = await repo.state.workingTreeChanges;
    return uncommittedFiles.map(change => change.uri.path);
}

module.exports = getUncommittedFiles;