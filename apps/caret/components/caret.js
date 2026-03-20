/**
 * caret.js - Custom caret for EditContext based editors
 */

/**
 * createCaret {
 *   @param {HTMLElement} parent - the editor container
 *   @param {HTMLElement} main - the editor div
 *   @param {Object} options {
 *     @param {string} caretColor - caret color
 *     @param {number} caretWidth - caret width in px, default 2
 *   }
 *   @returns {{ update: (selStart, main) => void, show: () => void, hide: () => void, destroy: () => void }}
 * }
 */
function createCaret(parent, main, options = {}) {
    const color = options.caretColor || options.focusColor || "#fff";
    const width = options.caretWidth || 2;

    const caretEl = document.createElement("div");
    caretEl.className = "Caret-caret-" + options.id;
    caretEl.style.position = "absolute";
    caretEl.style.width = `${width}px`;
    caretEl.style.background = color;
    caretEl.style.pointerEvents = "none";
    caretEl.style.zIndex = "10";
    caretEl.style.opacity = "0";
    caretEl.style.borderRadius = "1px";
    caretEl.style.animation = "caret-blink 1s step-end infinite";

    if (!document.getElementById("caret-blink-style")) {
        const style = document.createElement("style");
        style.id = "caret-blink-style";
        style.textContent = `@keyframes caret-blink { 0%,100%{opacity:1} 50%{opacity:0} }`;
        document.head.appendChild(style);
    }

    parent.appendChild(caretEl);

    function update(selStart) {
        // walk text nodes to find exact position
        let remaining = selStart;
        let targetNode = null;
        let targetOffset = 0;

        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (remaining <= node.textContent.length) {
                targetNode = node;
                targetOffset = remaining;
                break;
            }
            remaining -= node.textContent.length;
        }

        if (!targetNode) {
            caretEl.style.left = "5px";
            caretEl.style.top = "5px";
            caretEl.style.height = "21px";
            return;
        }

        const range = document.createRange();
        range.setStart(targetNode, targetOffset);
        range.collapse(true);

        const rect = range.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        if (rect.width === 0 && rect.height === 0) return;

        caretEl.style.left = rect.left - parentRect.left + parent.scrollLeft + "px";
        caretEl.style.top = rect.top - parentRect.top + parent.scrollTop + "px";
        caretEl.style.height = (rect.height || 21) + "px";
    }

    function show() {
        caretEl.style.opacity = "1";
        caretEl.style.animation = "caret-blink 1s step-end infinite";
    }

    function hide() {
        caretEl.style.opacity = "0";
        caretEl.style.animation = "none";
    }

    function destroy() {
        caretEl.remove();
    }

    return { update, show, hide, destroy };
}

export { createCaret };