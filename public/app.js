const form = document.getElementById('package-form');
const statusBox = document.getElementById('status-box');
const downloadBox = document.getElementById('download-box');
const pdfLink = document.getElementById('pdf-link');
const epubLink = document.getElementById('epub-link');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    content: document.getElementById('content').value,
    theme: document.getElementById('theme').value
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Packaging...';
  statusBox.textContent = 'Generating your files...';
  statusBox.className = 'rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100';
  downloadBox.classList.add('hidden');

  try {
    const response = await fetch('/api/package', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Something went wrong while packaging.');
    }

    pdfLink.href = result.download_urls.pdf;
    epubLink.href = result.download_urls.epub;
    downloadBox.classList.remove('hidden');

    statusBox.textContent = `Generated successfully for “${result.title}” using the ${result.theme} theme.`;
    statusBox.className = 'rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100';
  } catch (error) {
    statusBox.textContent = error.message || 'The package could not be created.';
    statusBox.className = 'rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Package Now';
  }
});
