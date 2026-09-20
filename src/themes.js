const themes = {
  minimalist: {
    name: 'Clean Minimalist',
    base: {
      backgroundColor: '#f8f7f4',
      color: '#1f2937',
      fontFamily: 'Georgia, "Times New Roman", serif',
      lineHeight: 1.7,
      letterSpacing: '0.01em'
    },
    page: {
      maxWidth: '760px',
      margin: '0 auto',
      padding: '72px 48px 96px',
      backgroundColor: '#ffffff',
      boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
      borderLeft: 'none',
      borderTop: 'none'
    },
    heading: {
      color: '#111827',
      fontFamily: 'Arial, Helvetica, sans-serif',
      letterSpacing: '0.02em',
      textTransform: 'none'
    },
    accent: '#0f172a',
    muted: '#4b5563',
    rule: '#d1d5db'
  },
  bold: {
    name: 'Professional Bold',
    base: {
      backgroundColor: '#eff6ff',
      color: '#0f172a',
      fontFamily: 'Arial, Helvetica, sans-serif',
      lineHeight: 1.75,
      letterSpacing: '0.01em'
    },
    page: {
      maxWidth: '820px',
      margin: '0 auto',
      padding: '64px 52px 88px',
      backgroundColor: '#f8fafc',
      boxShadow: '0 18px 36px rgba(15, 23, 42, 0.14)',
      borderLeft: '8px solid #1d4ed8',
      borderTop: 'none'
    },
    heading: {
      color: '#0f172a',
      fontFamily: 'Arial, Helvetica, sans-serif',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    },
    accent: '#1d4ed8',
    muted: '#475569',
    rule: '#93c5fd'
  }
};

function getTheme(themeName) {
  const selected = (themeName || 'minimalist').toLowerCase();
  return themes[selected] || themes.minimalist;
}

module.exports = { themes, getTheme };
