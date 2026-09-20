const puppeteer = require('puppeteer');
const epubGenerator = require('epub-gen');
const { marked } = require('marked');
const themes = require('./themes');
const fs = require('fs');
const path = require('path');

async function generatePDF(text, themeKey, outputFilename) {
    const theme = themes[themeKey] || themes.minimalist;
    const htmlContent = marked.parse(text);
    
    const fullHtml = `
    <html>
        <head>
            <style>
                body { ${theme.body} }
                h1 { ${theme.h1} }
                p { ${theme.p} }
                .container { ${theme.container} }
            </style>
        </head>
        <body>
            <div class="container">
                ${htmlContent}
            </div>
        </body>
    </html>
    `;

    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    await page.pdf({ path: outputFilename, format: 'A4', printBackground: true });
    await browser.close();
    
    return outputFilename;
}

async function generateEPUB(text, title, author, outputFilename) {
    const htmlContent = marked.parse(text);
    const option = {
        title: title,
        author: author,
        content: [
            {
                title: "Main Content",
                data: htmlContent
            }
        ]
    };

    await epubGenerator(option, outputFilename);
    return outputFilename;
}

module.exports = { generatePDF, generateEPUB };
