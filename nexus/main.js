const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html from the 'public' folder
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "public", "index.html");

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error serving index.html:", err);
            res.status(500).send("Error loading the browser UI.");
        }
    });
});

app.get("/fetch", async (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).send("No URL provided.");

    try {
        let response = await axios.get(url, { headers: { "User-Agent": "Nexus Browser" } });
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Error fetching page: " + error.message);
    }
});

app.listen(3000, () => {
    console.log("Nexus Browser running at http://localhost:3000");
});