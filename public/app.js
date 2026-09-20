        document.getElementById('packBtn').onclick = async () => {
            const btn = document.getElementById('packBtn');
            const resDiv = document.getElementById('results');
            btn.disabled = true;
            btn.innerText = "Packaging...";
            resDiv.classList.add('hidden');

            const formData = new FormData();
            formData.append('text', document.getElementById('text').value);
            formData.append('title', document.getElementById('title').value);
            formData.append('author', document.getElementById('author').value);
            formData.append('theme', document.getElementById('theme').value);

            try {
                const response = await fetch('/api/package', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    document.getElementById('pdfLink').href = data.pdfUrl;
                    document.getElementById('epubLink').href = data.epubUrl;
                    resDiv.classList.remove('hidden');
                } else {
                    alert("Error: " + data.error);
                }
            } catch (e) {
                alert("Server error occurred.");
            } finally {
                btn.disabled = false;
                btn.innerText = "Package Assets 🚀";
            }
        };
