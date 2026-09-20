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
    try {
        await page.setJavaScriptEnabled(false);
        await page.setRequestInterception(true);
        page.on('request', request => request.abort());
        await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });
        await page.pdf({ path: outputFilename, format: 'A4', printBackground: true });
    } finally {
        await browser.close();
    }
    
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

    await new epubGenerator(option, outputFilename).promise;
    return outputFilename;
}

module.exports = { generatePDF, generateEPUB };
