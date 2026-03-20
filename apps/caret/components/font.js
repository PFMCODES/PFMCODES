/**
 * loadFont {
 *     @param {string} name - name of the font
 *     @param {string/url} url - url to external font
 *     @returns {void}
 * }
*/

// load the font dynamically
async function loadFont(name, url) {
    const font = new FontFace(name, `url("${url}")`);
    await font.load();
    document.fonts.add(font);
}

export { loadFont }