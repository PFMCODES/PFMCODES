const fs = require('fs-extra');
const path = require('path');
const md = require('markdown-it')({ html: true });

const srcDir = './docs';  // Directory with .md files
const outDir = './docs';   // Where to save .html files

async function compileAll() {
  await fs.ensureDir(outDir);
  const files = await fs.readdir(srcDir);

  for (const file of files) {
    if (path.extname(file) === '.md') {
      const content = await fs.readFile(path.join(srcDir, file), 'utf-8');
      const html = md.render(content);
      
      // Wrap in a full HTML template (optional but recommended)
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${file.replace(".md", "")}</title>
    <link rel="shortcut icon" href="../logo.svg" type="image/x-icon">
    <link rel="stylesheet" href="ui.css">
</head>
<body>
    ${html}
    <script type="module" src="./ui.js"></script>
</body>
</html>`;
      
      const outFileName = path.basename(file, '.md') + '.html';
      await fs.writeFile(path.join(outDir, outFileName), fullHtml);
      console.log(`Compiled: ${file} -> ${outFileName}`);
    }
  }
}

compileAll().catch(err => console.error(err));