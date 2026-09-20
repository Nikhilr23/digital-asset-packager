<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Digital Asset Packager</title>
    <link rel="stylesheet" href="/dist.css" />
  </head>
  <body class="min-h-screen bg-slate-100 text-slate-900 antialiased">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <header class="mb-8">
        <p class="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Creator studio</p>
        <h1 class="text-4xl font-bold tracking-tight text-slate-900">Digital Asset &amp; E-Book Packager</h1>
      </header>

      <main class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form id="package-form" class="space-y-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Book Title</label>
              <input id="title" name="title" type="text" required placeholder="The Last Draft" class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="author">Author Name</label>
              <input id="author" name="author" type="text" required placeholder="Jane Writer" class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="theme">Theme</label>
              <select id="theme" name="theme" class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                <option value="minimalist">Clean Minimalist</option>
                <option value="bold">Professional Bold</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700" for="content">Markdown Content</label>
              <textarea id="content" name="content" rows="16" required class="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="# Chapter 1&#10;&#10;Start writing your manuscript here..."># My Book

This is a sample manuscript written in Markdown.

## Section One

- List item one
- List item two
- List item three

> A quote to showcase the style.

### Formatting

Use **bold**, *italics*, and `code` to create polished content.
</textarea>
            </div>

            <button id="submit-btn" type="submit" class="w-full rounded-xl bg-slate-900 px-4 py-3 text-base font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300">
              Package Now
            </button>
          </form>
        </section>

        <aside class="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
          <h2 class="mb-4 text-xl font-semibold">Output</h2>
          <div id="status-box" class="rounded-xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-200">
            Ready to generate your PDF and EPUB.
          </div>

          <div id="download-box" class="mt-6 hidden space-y-4">
            <div class="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
              <p class="text-xs uppercase tracking-[0.2em] text-blue-200">PDF</p>
              <a id="pdf-link" class="mt-2 inline-flex text-base font-medium text-blue-300 hover:text-blue-200" href="#" target="_blank" rel="noreferrer">Download PDF</a>
            </div>
            <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-200">EPUB</p>
              <a id="epub-link" class="mt-2 inline-flex text-base font-medium text-emerald-300 hover:text-emerald-200" href="#" target="_blank" rel="noreferrer">Download EPUB</a>
            </div>
          </div>
        </aside>
      </main>
    </div>

    <script src="/app.js"></script>
  </body>
</html>
