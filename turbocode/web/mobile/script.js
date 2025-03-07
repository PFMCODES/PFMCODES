document.addEventListener("DOMContentLoaded", () => {
    const openFileButton = document.getElementById("open-file");
    const saveFileButton = document.getElementById("save-file");
    let currentFileHandle = null;

    // Initialize CodeMirror editor
    const editor = CodeMirror.fromTextArea(document.getElementById("editor-area"), {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        indentUnit: 4,
        smartIndent: true,
        autofocus: true,
        lineWrapping: true,
        matchBrackets: true
    });

    // Function to open a file
    async function openFile() {
        try {
            const [fileHandle] = await window.showOpenDirectory();
            currentFileHandle = fileHandle; // Store file handle
            const file = await fileHandle.getFile();
            const text = await file.text();
            editor.setValue(text);
        } catch (error) {
            console.error("File selection canceled or failed:", error);
        }
    }

    // Function to save file
    async function saveFile() {
        if (!currentFileHandle) {
            alert("No file selected. Open a file first!");
            return;
        }

        try {
            const writable = await currentFileHandle.createWritable();
            await writable.write(editor.getValue());
            await writable.close();
        } catch (error) {
            console.error("Error saving file:", error);
            alert("Failed to save file.");
        }
    }

    // Attach event listeners to buttons
    openFileButton.addEventListener("click", openFile);
    saveFileButton.addEventListener("click", saveFile);
});
