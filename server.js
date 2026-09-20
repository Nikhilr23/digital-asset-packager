require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { generatePDF, generateEPUB } = require('./converter');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static('public'));

app.get('/health', (req, res) => {
    res.send('Packager Server is ONLINE 🚀');
});

app.post('/api/package', upload.single('file'), async (req, res) => {
    try {
        const { theme, title, author } = req.body;
        let text = "";
        if (req.file) {
            text = require('fs').readFileSync(req.file.path, 'utf8');
        } else if (req.body.text) {
            text = req.body.text;
        }
        if (!text) return res.status(400).json({ error: "No content provided" });

        const pdfName = `asset_${Date.now()}.pdf`;
        const epubName = `asset_${Date.now()}.epub`;

        await generatePDF(text, theme, path.join(__dirname, 'public', pdfName));
        await generateEPUB(text, title || "Untitled", author || "Unknown", path.join(__dirname, 'public', epubName));

        res.json({ success: true, pdfUrl: `/${pdfName}`, epubUrl: `/${epubName}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Conversion failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Packager Server running at http://0.0.0.0:${PORT}`);
});
