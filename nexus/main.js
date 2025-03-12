const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const app = express();
app.use(express.static(__dirname)); // Serve static files

app.get("/fetch", async (req, res) => {
    let url = req.query.url;
    try {
        const response = await axios.get(url);
        const dom = new JSDOM(response.data, { resources: "usable" });

        // Extract and apply styles
        const styles = dom.window.document.querySelectorAll("style, link[rel='stylesheet']");
        let cssContent = "";
        styles.forEach(style => {
            if (style.tagName === "STYLE") {
                cssContent += style.innerHTML;
            } else if (style.tagName === "LINK") {
                let href = style.getAttribute("href");
                if (href.startsWith("http")) {
                    cssContent += `@import url('${href}');`;
                }
            }
        });

        // Send combined HTML and CSS
        res.send(`
            <style>${cssContent}</style>
            ${dom.window.document.body.innerHTML}
        `);
    } catch (error) {
        console.error("Error fetching page:", error.message);
        res.status(500).send("Failed to load the page.");
    }
});

app.listen(3000, () => console.log("Nexus Browser running at http://localhost:3000"));