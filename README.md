# Digital Asset & E-Book Packager

A production-ready MVP for converting Markdown content into polished PDF and EPUB files tailored for digital publishing workflows.

## Features

- Markdown input editor with rich formatting support
- Theme selection for minimalist and bold publishing styles
- PDF generation using Puppeteer
- EPUB generation using epub-gen
- Express.js API with `/health` and `/api/package`
- Local file storage for MVP, ready for S3 migration
- PostgreSQL schema for user and asset tracking
- Deployment-ready structure for Railway.app or Heroku

## Tech Stack

- Node.js + Express.js
- Puppeteer for PDF generation
- epub-gen for EPUB generation
- marked for Markdown parsing
- Tailwind CSS for the frontend
- PostgreSQL for persistence

## Project Structure

```text
.
├── db/
│   └── schema.sql
├── public/
│   ├── app.js
│   ├── index.html
│   ├── styles.css
│   └── dist.css
├── src/
│   ├── converter.js
│   ├── db.js
│   ├── server.js
│   └── themes.js
├── storage/
├── .env.example
├── .gitignore
├── package.json
├── Procfile
├── railway.json
├── README.md
└── tailwind.config.js
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your database and app settings if needed.

4. Start the app:

```bash
npm start
```

5. Open the app in a browser:

```text
http://localhost:3000
```

## API

### POST /api/package

Request body:

```json
{
  "title": "My Book",
  "author": "Jane Writer",
  "content": "# Chapter 1\n\nThis is markdown content.",
  "theme": "minimalist"
}
```

Response:

```json
{
  "success": true,
  "download_urls": {
    "pdf": "/downloads/my-book-1234.pdf",
    "epub": "/downloads/my-book-5678.epub"
  }
}
```

### GET /health

Returns a simple heartbeat check used for deployment monitoring.

## PostgreSQL Setup

```bash
createdb digital_asset_packager
psql digital_asset_packager < db/schema.sql
```

Then set `DATABASE_URL` in `.env`.

## Deployment Guide for Railway.app

1. Push this repository to GitHub.
2. In Railway, click “New Project” -> “Deploy from GitHub repo”.
3. Select this repository.
4. Add the environment variables:
   - `PORT=3000`
   - `DATABASE_URL=postgresql://...`
5. Deploy the service.
6. Railway will automatically start the Node.js app using the provided `start` script.
7. Access the published app from the Railway generated domain.

## Notes

- The MVP uses local file storage in `storage/` for generated PDFs and EPUBs.
- This is intentionally structured for a later migration to S3 or another object-storage backend.
- The database layer is already prepared for SaaS asset logging and plan tracking.

## Next Enhancements

- User authentication and plan-based access
- Cover-page builder and custom typography options
- Chapter metadata and TOC generation
- AWS S3 integration for production storage
- Batch asset packaging and dashboard analytics
