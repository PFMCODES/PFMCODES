import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const appsPath = path.join(__dirname, 'apps');

// Middleware to serve subdomains
app.use((req, res, next) => {
    const host = req.headers.host; // e.g., lexius.pfmcodes.com
    const subdomain = host.split('.')[0]; // 'lexius'

    const subdomainPath = path.join(appsPath, subdomain);

    if (fs.existsSync(path.join(subdomainPath, 'index.html'))) {
        express.static(subdomainPath)(req, res, next);
    } else {
        res.status(404).send('Subdomain app not found');
    }
});

app.listen(3000, () => {
    console.log('Subdomain server running');
});