/**
 * createLineCounter {
 *     @param {HTMLElement} parent - the parent element the line counter goes inside of
 *     @param {number} lines - number of lines in the code
 *     @param {string/number} id - id for sepration and distinguishtion of multiple instances
 *     @param {object} options {
 *         @param {string/color} focusColor - border color of the editor when its in use
 *         @param {string/color} background - background color of the line counter
 *         @param {boolean} dark - if the user has dark theme enabled or not
 *         @param {object} theme {
 *             @param {object} dark {
 *                  @param {string/color} background - background color for the dark theme
 *             }
 *             @param {object} light {
 *                  @param {string/color} background - background color for the light theme
 *             }
 *         }
 *         @param {object} font {
 *             @param {string} url -  external font url or file path
 *             @param {string} name - font name, required for both internal and external custom font application
 *         }
 *     }
 * }
 */

import { loadFont } from "./font.js";

async function createLineCounter(parent, lines, id, options) {
    let fontUrl;
    let fontName;
    const font = options.font || {};
    if (!font.url && !font.name) {
        fontName = "monospace";
        parent.style.fontFamily = fontName;
    }
    else if (!font.url && font.name) {
        parent.style.fontFamily = font.name;
    }
    else {
        fontUrl = font.url;
        fontName = font.name;
        loadFont(fontName, fontUrl);
        parent.style.fontFamily = fontName;
    }
    const lineCounter = document.createElement("div");
    lineCounter.className = "lineCounter";
    lineCounter.id = `lineCounter-${id}`;
    const dark = options.dark || false;
    const theme =  options.theme || {};
    lineCounter.style.height = "auto";
    lineCounter.style.fontSize = "14px";
    lineCounter.style.lineHeight = "1.5";
    lineCounter.style.minWidth = "25px";
    lineCounter.style.top = "0px";
    lineCounter.style.borderRight = options.focusColor || "#fff";
    if (Object.keys(theme).length === 0) {
        lineCounter.style.color = dark ? "#fff" : "#111";
        lineCounter.style.background = dark ? "#1e1e1e" : "#fff";
        parent.style.background = dark ? "#1e1e1e" : "#fff";
    } else {
        lineCounter.style.color = dark ? theme.dark["color.lineCounter"] : theme.light["color.lineCounter"];
        lineCounter.style.background = dark ? theme.dark["background.lineCounter"] : theme.light["background.lineCounter"];
        parent.style.background = dark ? theme.dark["background.lineCounter"] : theme.light["background.lineCounter"];
    }
    for (let i = 0; i < lines; i++) {
        const lineNumber = document.createElement("div");
        lineNumber.className = "line-number";
        lineNumber.id = `line-number-${i}-${id}`;
        lineNumber.innerText = i + 1;
        lineCounter.appendChild(lineNumber);
    }

    parent.appendChild(lineCounter);
    return lineCounter; // 👈 return so you can update it later
}

function updateLineCounter(lineCounter, lines) {
    lineCounter.innerHTML = "";
    for (let i = 0; i < lines; i++) {
        const lineNumber = document.createElement("div");
        lineNumber.className = "line-number";
        lineNumber.innerText = i + 1;
        lineCounter.appendChild(lineNumber);
        lineNumber.style.height = "calc(14px * 1.5)"; // font-size * line-height
        lineNumber.style.display = "flex";
        lineNumber.style.alignItems = "center";
        lineNumber.style.margin = "auto";
    }
}

export { createLineCounter, updateLineCounter };