document.getElementById('saveDownloadBtn').addEventListener('click', () => {
    const content = document.getElementById('noteContent').value;
    if (!content) {
        alert('Please enter some note content before saving.');
        return;
    }
    const fileNameInput = document.getElementById('noteFileName');
    let fileName = '';
    if (fileNameInput) {
        fileName = fileNameInput.value.trim();
    }
    if (!fileName) {
        alert('Filename cannot be empty. Please enter a valid filename.');
        return false;
    }
    if (!fileName.toLowerCase().endsWith('.txt')) {
        fileName += '.txt';
    }
    // Use FileSaver.js library to save file with correct filename
    if (typeof saveAs === 'function') {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, fileName);
    } else {
        // Fallback to default method
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
