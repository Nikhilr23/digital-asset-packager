const { Pool } = require('pg');

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
  : null;

async function initDatabase() {
  if (!pool) {
    return null;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      plan_type VARCHAR(50) DEFAULT 'starter',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255),
      pdf_path TEXT,
      epub_path TEXT,
      theme_used VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return pool;
}

async function logAsset({ userId = 1, title, author, pdfPath, epubPath, themeUsed }) {
  if (!pool) {
    return null;
  }

  await pool.query(
    `
      INSERT INTO assets (user_id, title, author, pdf_path, epub_path, theme_used)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [userId, title, author, pdfPath, epubPath, themeUsed]
  );

  return true;
}

module.exports = { pool, initDatabase, logAsset };
