// Ensure global access to the editor
window.editor = null;
let currentFileHandle = null;

// Language Mode Mapping for CodeMirror
const modeMap = {
    "algol": "text/x-csrc",
    "assembly": "text/x-gas",
    "basic": "text/x-basic",
    "batch": "text/x-sh",
    "c": "text/x-csrc",
    "cpp": "text/x-c++src",
    "csharp": "text/x-csharp",
    "caml": "text/x-ocaml",
    "css": "text/css",
    "dart": "application/dart",
    "env": "text/plain",
    "erlang": "text/x-erlang",
    "fsharp": "text/x-fsharp",
    "gdscript": "text/x-gdscript",
    "go": "text/x-go",
    "haskell": "text/x-haskell",
    "html": "text/html",
    "java": "text/x-java",
    "javascript": "text/javascript",
    "json": "application/json",
    "kotlin": "text/x-kotlin",
    "matlab": "text/x-matlab",
    "perl": "text/x-perl",
    "php": "application/x-httpd-php",
    "python": "text/x-python",
    "r": "text/x-rsrc",
    "ruby": "text/x-ruby",
    "rust": "text/x-rustsrc",
    "scala": "text/x-scala",
    "shell": "text/x-sh",
    "sql": "text/x-sql",
    "swift": "text/x-swift",
    "typescript": "application/typescript",
    "webassembly": "text/x-wast"
};

// Initialize CodeMirror
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("editor-area");

    if (textarea) {
        window.editor = CodeMirror.fromTextArea(textarea, {
            mode: "javascript", // Default mode
            theme: "dracula",
            lineNumbers: true,
            indentUnit: 4,
            smartIndent: true,
            autofocus: true,
            lineWrapping: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            extraKeys: {
                "Ctrl-Space": "autocomplete"
            },
            hintOptions: {
                completeSingle: false
            }
        });

        console.log("Editor initialized with autocomplete:", window.editor);
    } else {
        console.error("Textarea not found!");
    }
});

// Function to trigger autocomplete manually
function triggerAutoComplete() {
    if (window.editor) {
        window.editor.showHint();
    }
}

// Automatically trigger autocomplete when typing
window.editor.on("inputRead", function (cm, event) {
    if (!cm.state.completionActive && event.text.length === 1) {
        CodeMirror.commands.autocomplete(cm);
    }
});

// Add event listener for manual autocomplete (Ctrl + Space)
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === " ") {
        event.preventDefault();
        triggerAutoComplete();
    }
});

// Function to change syntax highlighting mode
function changeLanguage(mode) {
    if (modeMap[mode]) {
        window.editor.setOption("mode", modeMap[mode]);
        console.log(`Mode changed to: ${modeMap[mode]}`);
    } else {
        console.warn("Unsupported language mode:", mode);
    }
}

// Sidebar Toggle
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebar");

toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    toggleSidebarBtn.style.left = sidebar.classList.contains("hidden") ? "10px" : "310px";
});

// Insert Default HTML Template (Ctrl + Shift + F)
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === "F") {
        event.preventDefault();
        insertDefaultHTML();
    }
});

function insertDefaultHTML() {
    const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <h1>Welcome to TurboCode!</h1>
    <p>This is a default HTML template.</p>
</body>
</html>`;

    if (window.editor) {
        window.editor.setValue(defaultHTML);
    }
}

// File Operations
async function saveOrDownloadFile() {
    if (!currentFileHandle) {
        downloadFile();
        return;
    }
    try {
        const writable = await currentFileHandle.createWritable();
        await writable.write(window.editor.getValue());
        await writable.close();
    } catch (error) {
        console.error("Error saving file:", error);
    }
}

async function downloadFile() {
    const fileName = prompt("Enter file name for download:", "untitled.txt");
    if (!fileName) return;
    const text = window.editor.getValue();
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

async function openFile() {
    try {
        [currentFileHandle] = await window.showOpenFilePicker();
        const file = await currentFileHandle.getFile();
        const text = await file.text();
        window.editor.setValue(text);
    } catch (error) {
        console.error("Error opening file:", error);
    }
}

async function deleteFile() {
    if (!currentFileHandle) {
        alert("No file selected!");
        return;
    }
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
        await currentFileHandle.remove();
        window.editor.setValue("");
        currentFileHandle = null;
    } catch (error) {
        console.error("Error deleting file:", error);
    }
}

async function renameFile() {
    if (!currentFileHandle) {
        alert("No file selected!");
        return;
    }
    const newName = prompt("Enter new file name:");
    if (!newName) return;
    alert("Renaming is not supported in the browser. Save the file with a new name instead.");
}

function createNewFile() {
    window.editor.setValue("");
    currentFileHandle = null;
}

function createNewFolder() {
    alert("Folder creation is not supported in the browser.");
}

// Event Listeners for Buttons
document.getElementById("save-file")?.addEventListener("click", saveOrDownloadFile);
document.getElementById("open-file")?.addEventListener("click", openFile);
document.getElementById("delete-file")?.addEventListener("click", deleteFile);
document.getElementById("rename-file")?.addEventListener("click", renameFile);
document.getElementById("new-file")?.addEventListener("click", createNewFile);
document.getElementById("new-folder")?.addEventListener("click", createNewFolder);
document.getElementById("download-file")?.addEventListener("click", downloadFile);
document.getElementById("language-select")?.addEventListener("change", function () {
    changeLanguage(this.value);
});