function parseHTML(html) {
    let dom = { tag: "root", children: [] };
    let stack = [dom];
    let regex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
        let tag = match[1];
        if (!match[0].startsWith("</")) {
            let node = { tag, children: [] };
            stack[stack.length - 1].children.push(node);
            stack.push(node);
        } else {
            stack.pop();
        }
    }
    return dom;
}

function parseCSS(html) {
    let css = "";
    let match = html.match(/<style>([\s\S]*?)<\/style>/);
    if (match) css = match[1];
    return css;
}

module.exports = { parseHTML, parseCSS };
