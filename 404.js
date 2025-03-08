const BLACKLISTED_KEY_CODES = [38, 40, 37, 39, 18, 20, 17, 16, 9, 27, 144];

// List of commands
const COMMANDS = {
    "exit": "Exiting terminal...",
    "help": "Available commands: exit, help"
};

let userInput, terminalOutput, Terminal, Keyboard;
let str = ""; // Stores user input

const app = () => {
    userInput = document.getElementById("userInput");
    terminalOutput = document.getElementById("code");
    Terminal = document.getElementById("Terminal");
    Keyboard = document.getElementById("Keyboard");

    Keyboard.focus();
    
    if (screen.width < 991) {
        Keyboard.addEventListener("keyup", key);
    } else {
        document.addEventListener("keypress", key);
    }

    document.addEventListener("keydown", backSpace);
};

// Execute command
const execute = (input) => {
    let output = "";

    if (input.length === 0) return;

    if (!COMMANDS.hasOwnProperty(input)) {
        output = `<p>The command entered is not correct</p>`;
    } 
    else if (input === "exit" || input === "close") {
        history.back(); // Fix: Added parentheses to execute the function
        return;
    } 
    else {
        output = COMMANDS[input];
    }

    terminalOutput.innerHTML += `<p class="out_code">${output}</p>`;
    Terminal.scrollTop = terminalOutput.scrollHeight;
};

// Key event handling
const key = (event) => {
    let currentKey = event.key;

    Keyboard.focus();

    if (BLACKLISTED_KEY_CODES.includes(event.keyCode)) return;

    if (event.key === "Enter") {
        execute(userInput.innerText.trim());
        userInput.innerHTML = "";
        str = "";
    } else {
        str += currentKey;
        event.preventDefault();
        userInput.innerHTML = str;
    }
};

// Backspace key handling
const backSpace = (e) => {
    if (e.keyCode === 8) {
        str = str.slice(0, -1);
        userInput.innerHTML = str;
    }
};

// UI button functions
const BTNS = (t) => {
    const body = document.getElementById("body");

    switch (t) {
        case "max":
            body.className = body.className !== "max" ? "max" : "";
            break;
        case "min":
            body.className = body.className === "max" ? "max min" : "min";
            break;
        case "re":
            body.className = body.className.includes("min") ? "max" : "";
            break;
    }
};

document.addEventListener("DOMContentLoaded", app);