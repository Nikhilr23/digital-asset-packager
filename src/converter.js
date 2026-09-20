const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const Epub = require('epub-gen');
const { getTheme } = require('./themes');

const storageDir = path.join(__dirname, '..', 'storage');

function ensureStorageDir() {
  fs.mkdirSync(storageDir, { recursive: true });
  return storageDir;
}

function slugify(value) {
  return (value || 'book')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'book';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMarkdownToHtml({ title, author, markdown, themeName }) {
  const theme = getTheme(themeName);
  const htmlBody = marked.parse(markdown || '');

  const styleRules = `
    :root {
      --page-bg: ${theme.base.backgroundColor};
      --page-color: ${theme.base.color};
      --accent: ${theme.accent};
      --muted: ${theme.muted};
      --rule: ${theme.rule};
      --heading-font: ${theme.heading.fontFamily};
      --body-font: ${theme.base.fontFamily};
    }

    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: var(--page-bg);
      color: var(--page-color);
      font-family: var(--body-font);
      line-height: ${theme.base.lineHeight};
      letter-spacing: ${theme.base.letterSpacing};
    }

    body {
      padding: 36px 20px;
    }

    .book {
      max-width: ${theme.page.maxWidth};
      margin: ${theme.page.margin};
      padding: ${theme.page.padding};
      background: ${theme.page.backgroundColor};
      box-shadow: ${theme.page.boxShadow || 'none'};
      border-left: ${theme.page.borderLeft || 'none'};
      border-top: ${theme.page.borderTop || 'none'};
    }

    .book-header {
      border-bottom: 1px solid var(--rule);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }

    .book-header h1 {
      margin: 0;
      font-family: var(--heading-font);
      color: ${theme.heading.color};
      letter-spacing: ${theme.heading.letterSpacing || '0.01em'};
      text-transform: ${theme.heading.textTransform || 'none'};
      font-size: clamp(2.2rem, 3vw, 3rem);
      line-height: 1.1;
    }

    .book-meta {
      margin-top: 8px;
      font-size: 0.96rem;
      color: var(--muted);
      font-weight: 600;
    }

    .book-body {
      font-size: 1.02rem;
    }

    .book-body h1,
    .book-body h2,
    .book-body h3,
    .book-body h4,
    .book-body h5,
    .book-body h6 {
      font-family: var(--heading-font);
      color: ${theme.heading.color};
      margin-top: 1.6em;
      margin-bottom: 0.7em;
      letter-spacing: ${theme.heading.letterSpacing || '0.01em'};
      text-transform: ${theme.heading.textTransform || 'none'};
      line-height: 1.2;
    }

    .book-body p,
    .book-body li,
    .book-body blockquote {
      margin-bottom: 1em;
    }

    .book-body a {
      color: var(--accent);
      text-decoration: underline;
    }

    .book-body code {
      background: rgba(148, 163, 184, 0.12);
      padding: 0.15em 0.35em;
      border-radius: 4px;
      font-size: 0.92em;
    }

    .book-body pre {
      background: #0f172a;
      color: #e2e8f0;
      padding: 16px 18px;
      overflow-x: auto;
      border-radius: 10px;
      margin: 1.25em 0;
    }

    .book-body blockquote {
      border-left: 4px solid var(--accent);
      padding-left: 1.0em;
      color: var(--muted);
      margin-left: 0;
    }

    .book-body hr {
      border: none;
      border-top: 1px solid var(--rule);
      margin: 2em 0;
    }

    .book-body img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em 0;
      border-radius: 12px;
    }
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${escapeHtml(title || 'Untitled Book')}</title>
        <style>${styleRules}</style>
      </head>
      <body>
        <article class="book">
          <header class="book-header">
            <h1>${escapeHtml(title || 'Untitled Book')}</h1>
            <div class="book-meta">by ${escapeHtml(author || 'Unknown Author')}</div>
          </header>
          <div class="book-body">${htmlBody}</div>
        </article>
      </body>
    </html>
  `;
}

async function generatePdf({ title, author, markdown, themeName, outputDir }) {
  const fileName = `${slugify(title)}-${crypto.randomBytes(4).toString('hex')}.pdf`;
  const html = renderMarkdownToHtml({ title, author, markdown, themeName });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage({
      format: 'A4',
      printBackground: true
    });

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: path.join(outputDir, fileName),
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    return fileName;
  } finally {
    await browser.close();
  }
}

async function generateEpub({ title, author, markdown, themeName, outputDir }) {
  const fileName = `${slugify(title)}-${crypto.randomBytes(4).toString('hex')}.epub`;
  const html = renderMarkdownToHtml({ title, author, markdown, themeName });
  const outputPath = path.join(outputDir, fileName);

  await new Promise((resolve, reject) => {
    const epub = new Epub(
      {
        title: title || 'Untitled Book',
        author: author || 'Unknown Author',
        version: 3,
        content: [{ title: title || 'Untitled Book', data: html }]
      },
      outputPath
    );

    if (epub && epub.promise) {
      epub.promise.then(resolve).catch(reject);
      return;
    }

    if (typeof epub.generate === 'function') {
      epub.generate().then(resolve).catch(reject);
      return;
    }

    reject(new Error('epub-gen did not return a usable promise or generate method.'));
  });

  return fileName;
}

async function packageBook({ title, author, content, themeName }) {
  const outputDir = ensureStorageDir();

  const pdfFileName = await generatePdf({
    title,
    author,
    markdown: content,
    themeName,
    outputDir
  });

  const epubFileName = await generateEpub({
    title,
    author,
    markdown: content,
    themeName,
    outputDir
  });

  return {
    pdf_file: pdfFileName,
    epub_file: epubFileName,
    pdf_path: `/downloads/${pdfFileName}`,
    epub_path: `/downloads/${epubFileName}`
  };
}

module.exports = { packageBook, renderMarkdownToHtml, ensureStorageDir };
