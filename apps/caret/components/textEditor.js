/**
 * createTextEditor {
 *    @param {string} content - Initial content of the editor
 *    @param {HTMLElement} parent - The element to append the editor to
 *    @param {Object} options - Optional configuration {
 *            @param {boolean} dark - dark theme is enabled or not, false by default
 *            @param {boolean} shadow - should boxShadow be enabled, true by default
 *            @param {string} focusColor - color of focus border, by default it is purple(#7c3aed)
 *            @param {string} shadowColor - only needed if the box shadow is enabled, default is black
 *            @param {boolean} lock - if enabled, makes the editor non editable, false by default
 *            @param {string} language - language for syntax highlighting, default is plaintext
 *            @param {string} hlTheme - highlight.js theme, default is hybrid
 *            @param {JSON} font {
 *                @param {string} url - optional, only needed if applying custom font
 *                @param {string} name - required if you want custom font with or without external font
 *            }
 *            @param {string/number} id - unique id for the editor for multiple instances
 *            @param {JSON} theme {
 *                @param {object} dark {
 *                    @param {string/color} background - background color for the dark theme
 *                    @param {string/color} color.editor - text color for dark theme
 *                    @param {string/color} editor.caret - caret color for dark theme
 *                }
 *                @param {object} light {
 *                    @param {string/color} background - background color for the light theme
 *                    @param {string/color} color.editor - text color for light theme
 *                    @param {string/color} editor.caret - caret color for light theme
 *                }
 *            }
 *    }
 *    @returns {object} {
 *                @return {string} getValue => () - returns the current value of editor
 *                @return {void} setValue => (@param {string} val) - sets the value of editor
 *                @return {void} onChange => (@param {function} fn) - fires when value changes
 *                @return {boolean} isFocused - tells if the editor is focused
 *                @return {void} setLanguage => (@param {string} lang) - changes highlight language
 *    }
 * }
*/
import { createLineCounter, updateLineCounter } from "./lineCounter.js";
import { loadFont } from "./font.js";
import { createCaret } from "./caret.js";
// @ts-ignore
import hljs from "https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/core.js";
import languages from "./languages.js";

languages.init();

async function createTextEditor(parent, content = "", id, options = {}) {
    async function isChromiumEngine() {
        // 1. Modern check (Client Hints)
        if (navigator.userAgentData) {
            return navigator.userAgentData.brands.some(b => b.brand === 'Chromium');
        }

        // 2. Fallback for older browsers or non-supporting environments
        // Chrome/Chromium usually has "Chrome" in the UA but NOT "Edge" or "OPR" 
        // unless you want to include those Chromium-based browsers.
        const ua = navigator.userAgent;
        return /Chrome/i.test(ua) && !/Edg/i.test(ua) && !/OPR/i.test(ua);
    }

    async function getBrowserName() {
        // 1. Check for modern Client Hints API
        if (navigator.userAgentData) {
            const brands = navigator.userAgentData.brands;
            // Find the first brand that isn't a generic "Chromium" tag if possible
            const primaryBrand = brands.find(b => b.brand !== 'Chromium' && b.brand !== 'Not(A:Brand)') || brands[0];
            return primaryBrand.brand;
        }

        // 2. Fallback to User Agent string sniffing
        const ua = navigator.userAgent;
        if (ua.includes("Firefox")) return "Mozilla Firefox";
        if (ua.includes("SamsungBrowser")) return "Samsung Internet";
        if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
        if (ua.includes("Trident")) return "Internet Explorer";
        if (ua.includes("Edge")) return "Microsoft Edge (Legacy)";
        if (ua.includes("Edg")) return "Microsoft Edge";
        if (ua.includes("Chrome")) return "Google Chrome";
        if (ua.includes("Safari")) return "Apple Safari";
        
        return "Unknown Browser";
    }


    // Usage in your code
    isChromiumEngine().then(async isChromium => {
        if (!isChromium) {
            const main = document.createElement("div");
            main.style = "display: flex; align-items: center; justify-content: center; padding: 20px; white-space: pre-wrap; margin: 0 auto;";
            // Corrected navigator.userAgent usage below
            main.innerHTML = `<h2>Caret (editor engine) does not yet support ${await getBrowserName()}.<br>File an issue <a href="https://github.com/PFMCODES/Caret/issues">here.</a></h2>`;
            parent.appendChild(main);
        }
    });
    if (id === undefined || id === null || (typeof id !== "string" && typeof id !== "number")) {
        console.error(`parameter 'id' of function createTextEditor must not be '${typeof id}', it must be a number or string`);
        return;
    }
    if (!parent || !(parent instanceof HTMLElement)) {
        console.error(`'parent' parameter of function 'createTextEditor' must be an HTMLElement`);
        return;
    }
    if (!("EditContext" in window)) {
        console.error("EditContext API is not supported in ", await getBrowserName());
        return;
    }

    // undo/redo stack
    if (!window.caret) window.caret = {};
    window.caret[`undoStack.${id}`] = [{ content, cursor: 0 }];
    window.caret[`redoStack.${id}`] = [];

    const lock = options.lock || false;
    const focusColor = options.focusColor || '#7c3aed';
    const dark = options.dark || false;
    const boxShadow = options.shadow ?? true;
    const shadowColor = options.shadowColor || "#000";
    const theme = options.theme;
    const font = options.font || {};
    let language = options.language || "plaintext";

    // load hljs theme
    const themeLink = document.createElement("link");
    themeLink.rel = "stylesheet";
    themeLink.id = `caret-theme-${id}`;
    themeLink.href = options.hlTheme
        ? `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/${options.hlTheme}.css`
        : `https://esm.sh/@pfmcodes/highlight.js@1.0.0/styles/hybrid.css`;
    document.head.appendChild(themeLink);

    // load language if not registered
    if (!languages.registeredLanguages.includes(language)) {
        const mod = await import(`https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/${language}.js`);
        languages.registerLanguage(language, mod.default);
    }

    let fontName;
    if (!font.url && !font.name) {
        fontName = "monospace";
        parent.style.fontFamily = fontName;
    } else if (!font.url && font.name) {
        parent.style.fontFamily = font.name;
    } else {
        fontName = font.name;
        loadFont(fontName, font.url);
        parent.style.fontFamily = fontName;
    }

    // text model
    let text = content;
    let selStart = content.length;
    let selEnd = content.length;
    let isFocused = false;
    let onChangeFn = null;

    // EditContext
    const editContext = new EditContext({
        text,
        selectionStart: selStart,
        selectionEnd: selEnd
    });

    // main div
    const main = document.createElement("div");
    main.editContext = editContext;
    main.tabIndex = 0;
    main.style.whiteSpace = "pre";
    main.style.height = "100%";
    main.style.width = "100%";
    main.style.minWidth = "50px";
    main.style.minHeight = "25px";
    main.style.fontSize = "14px";
    main.style.lineHeight = "1.5";
    main.style.outline = "none";
    main.style.boxSizing = "border-box";
    main.style.borderTopRightRadius = "5px";
    main.style.borderBottomRightRadius = "5px";
    main.style.transition = "all 0.2s ease-in-out";
    main.style.display = "block";
    main.style.paddingTop = "5px";
    main.style.overflowX = "auto";
    main.style.scrollbarWidth = "none";
    main.style.cursor = "text";
    main.style.userSelect = "none";
    main.style.caretColor = "transparent";

    if (boxShadow) main.style.boxShadow = `1px 1px 1px 1px ${shadowColor}`;

    if (!theme) {
        main.style.background = dark ? "#101010" : "#d4d4d4";
        main.style.color = dark ? "#fff" : "#000";
    } else {
        main.style.background = dark ? theme.dark["background.editor"] : theme.light["background.editor"];
        main.style.color = dark ? theme.dark["color.editor"] : theme.light["color.editor"];
    }

    // caret color
    let caretColor;
    if (options.theme) {
        caretColor = dark ? options.theme.dark["editor.caret"] : options.theme.light["editor.caret"];
    } else {
        caretColor = "#fff";
    }

    // parent styles
    parent.style.display = "flex";
    parent.style.alignItems = "flex-start";
    parent.style.border = "2px solid #0000";
    parent.style.padding = "5px";
    parent.style.position = "relative";

    // line counter
    let lineCounter;
    lineCounter = await createLineCounter(parent, content.split("\n").length, id, options);

    parent.appendChild(main);

    // caret
    const caret = createCaret(parent, main, { ...options, caretColor });

    // --- render ---
    function render() {
        const highlighted = hljs.highlight(unescapeHTML(text), { language }).value;
        main.innerHTML = highlighted;
        updateLineCounter(lineCounter, text.trimEnd().split("\n").length);
        caret.update(selStart);
        if (onChangeFn) onChangeFn(text);
    }

    // --- undo/redo ---
    function saveState() {
        const stack = window.caret[`undoStack.${id}`];
        if (text !== stack[stack.length - 1]?.content) {
            stack.push({ content: text, cursor: selStart });
            window.caret[`redoStack.${id}`] = [];
        }
    }

    function undo() {
        const stack = window.caret[`undoStack.${id}`];
        const redoStack = window.caret[`redoStack.${id}`];
        if (stack.length <= 1) return;
        const current = stack.pop();
        redoStack.push(current);
        const prev = stack[stack.length - 1];
        text = prev.content;
        const diff = current.content.length - prev.content.length;
        selStart = selEnd = Math.max(0, current.cursor - diff);
        editContext.updateText(0, editContext.text.length, text);
        editContext.updateSelection(selStart, selEnd);
        render();
    }

    function redo() {
        const stack = window.caret[`undoStack.${id}`];
        const redoStack = window.caret[`redoStack.${id}`];
        if (redoStack.length === 0) return;
        const next = redoStack.pop();
        stack.push(next);
        text = next.content;
        selStart = selEnd = next.cursor;
        editContext.updateText(0, editContext.text.length, text);
        editContext.updateSelection(selStart, selEnd);
        render();
    }

    // --- EditContext events ---
    editContext.addEventListener("textupdate", (e) => {
        if (lock) return;
        text = text.slice(0, e.updateRangeStart) + e.text + text.slice(e.updateRangeEnd);
        selStart = selEnd = e.selectionStart;
        editContext.updateText(0, editContext.text.length, text);
        saveState();
        render();
    });

    editContext.addEventListener("selectionchange", (e) => {
        selStart = e.selectionStart;
        selEnd = e.selectionEnd;
        caret.update(selStart);
    });

    editContext.addEventListener("textformatupdate", () => {
        // IME formatting — ignore for now
    });

    // --- keyboard events ---
    main.addEventListener("keydown", (e) => {
        if (lock) return;

        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === "z") {
            e.preventDefault();
            undo();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "y") {
            e.preventDefault();
            redo();
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "Z") {
            e.preventDefault();
            redo();
            return;
        }

        // Tab
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            const indent = "    ";
            if (selStart !== selEnd) {
                const before = text.slice(0, selStart);
                const selected = text.slice(selStart, selEnd);
                const after = text.slice(selEnd);
                const indented = selected.split("\n").map(l => indent + l).join("\n");
                text = before + indented + after;
                selEnd = selStart + indented.length;
            } else {
                text = text.slice(0, selStart) + indent + text.slice(selStart);
                selStart = selEnd = selStart + indent.length;
            }
            editContext.updateText(0, editContext.text.length, text);
            editContext.updateSelection(selStart, selEnd);
            saveState();
            render();
            return;
        }

        // Shift+Tab
        if (e.shiftKey && e.key === "Tab") {
            e.preventDefault();
            if (selStart !== selEnd) {
                const before = text.slice(0, selStart);
                const selected = text.slice(selStart, selEnd);
                const after = text.slice(selEnd);
                const unindented = selected.split("\n").map(l =>
                    l.startsWith("    ") ? l.slice(4) :
                    l.startsWith("\t") ? l.slice(1) : l
                ).join("\n");
                text = before + unindented + after;
                selEnd = selStart + unindented.length;
            } else {
                const lineStart = text.lastIndexOf("\n", selStart - 1) + 1;
                const linePrefix = text.slice(lineStart, lineStart + 4);
                if (linePrefix === "    ") {
                    text = text.slice(0, lineStart) + text.slice(lineStart + 4);
                    selStart = selEnd = Math.max(lineStart, selStart - 4);
                }
            }
            editContext.updateText(0, editContext.text.length, text);
            editContext.updateSelection(selStart, selEnd);
            saveState();
            render();
            return;
        }
    });

    // paste
    main.addEventListener("paste", (e) => {
        if (lock) return;
        e.preventDefault();
        const pasteText = e.clipboardData.getData("text/plain");
        text = text.slice(0, selStart) + pasteText + text.slice(selEnd);
        selStart = selEnd = selStart + pasteText.length;
        editContext.updateText(0, editContext.text.length, text);
        editContext.updateSelection(selStart, selEnd);
        saveState();
        render();
    });

    // focus/blur
    main.addEventListener("focus", () => {
        isFocused = true;
        parent.style.border = `2px solid ${focusColor}`;
        parent.style.boxShadow = "none";
        caret.show();
        caret.update(selStart);
    });

    main.addEventListener("blur", () => {
        isFocused = false;
        parent.style.border = "2px solid #0000";
        if (boxShadow) parent.style.boxShadow = `1px 1px 1px 1px ${shadowColor}`;
        caret.hide();
    });

    // click to position cursor
    main.addEventListener("click", (e) => {
        main.focus();
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (!range) return;

        // walk text nodes to find offset
        let offset = 0;
        let remaining = 0;
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (node === range.startContainer) {
                offset = remaining + range.startOffset;
                break;
            }
            remaining += node.textContent.length;
        }

        selStart = selEnd = offset;
        editContext.updateSelection(selStart, selEnd);
        caret.update(selStart);
    });

    // initial render
    render();

    return {
        getValue: () => text,
        getCursor: () => selStart,
        setCursor: (pos) => {
            selStart = selEnd = Math.max(0, Math.min(pos, text.length));
            editContext.updateSelection(selStart, selEnd);
            caret.update(selStart);
        },
        undo: undo,
        redo: redo,
        setValue: (val) => {
            text = val;
            selStart = selEnd = val.length;
            editContext.updateText(0, editContext.text.length, text);
            editContext.updateSelection(selStart, selEnd);
            render();
        },
        id: options.id,
        onChange: (fn) => { onChangeFn = fn; },
        isFocused: () => isFocused,
        setLanguage: async (lang) => {
            if (!languages.registeredLanguages.includes(lang)) {
                const mod = await import(`https://esm.sh/@pfmcodes/highlight.js@1.0.0/es/languages/${lang}.js`);
                languages.registerLanguage(lang, mod.default);
            }
            language = lang;
            render();
        },
        delete: () => {
            parent.removeChild(main);
            parent.removeChild(lineCounter);
            caret.destroy();
            document.head.removeChild(themeLink);
            parent.style = "";
        }
    };
}

function unescapeHTML(str) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#039;': "'"
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#039;/g, tag => entities[tag] || tag);
}

export { createTextEditor }