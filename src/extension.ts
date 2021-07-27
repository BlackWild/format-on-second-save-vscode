import * as vscode from "vscode";

/**
 * This function handles the save shortcut press; usually ctrl+s or cmd+s
 * @returns void
 */
async function onSaveShortcutKeyPressed() {
  // capturing the editor
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  // formatting
  if (activeEditor.document.isDirty) {
    // if the document has changed, only save it without formatting
    // so nothing to do here
  } else {
    // If the document has no changes, format the document then save it
    await vscode.commands.executeCommand(
      "editor.action.formatDocument",
      activeEditor.document.uri
    );
  }

  // saving
  await vscode.commands.executeCommand<[]>(
    "workbench.action.files.saveWithoutFormatting",
    activeEditor.document.uri
  );

  // note: saveWithoutFormatting is used in order not to trigger the formatter
  // if the editor.formatOnSave option is enabled
}

export function activate(context: vscode.ExtensionContext) {
  // Register the command
  let disposable = vscode.commands.registerCommand(
    "format-on-second-save.handleSaveShortcutKeyPress",
    onSaveShortcutKeyPressed
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {
  // nothing to do here
}
