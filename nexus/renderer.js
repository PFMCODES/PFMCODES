function render(dom, styles) {
    let content = convertDOMToHTML(dom); // Convert the parsed DOM back to HTML
    return `<html><head><style>${styles}</style></head><body>${content}</body></html>`;
}

function convertDOMToHTML(dom) {
    if (!dom || !dom.children) return "";
    return dom.children.map(node => {
        return `<${node.tag}>${convertDOMToHTML(node)}</${node.tag}>`;
    }).join("");
}

module.exports = { render };