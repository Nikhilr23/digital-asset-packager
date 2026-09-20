require('dotenv').config();
const express = require('express');
const path = require('path');
const { packageBook } = require('./converter');
const { initDatabase, logAsset } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use('/downloads', express.static(path.join(__dirname, '..', 'storage')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'digital-asset-packager' });
});

app.post('/api/package', async (req, res) => {
  try {
    const { title, author, content, theme } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const result = await packageBook({
      title,
      author,
      content,
      themeName: theme || 'minimalist'
    });

    await logAsset({
      userId: 1,
      title,
      author,
      pdfPath: result.pdf_path,
      epubPath: result.epub_path,
      themeUsed: theme || 'minimalist'
    });

    return res.status(200).json({
      success: true,
      title,
      author,
      theme: theme || 'minimalist',
      download_urls: {
        pdf: result.pdf_path,
        epub: result.epub_path
      }
    });
  } catch (error) {
    console.error('Packaging failed:', error);
    return res.status(500).json({
      error: 'Packaging failed.',
      details: error.message
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

async function bootstrap() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Digital Asset Packager running on http://localhost:${PORT}`);
  });
}

bootstrap();
