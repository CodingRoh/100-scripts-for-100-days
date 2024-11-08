document.getElementById('analyze-btn').addEventListener('click', analyzeImage);

async function analyzeImage() {
    const imageInput = document.getElementById('image-upload').files[0];
    const resultText = document.getElementById('result-text');
    const uploadedImage = document.getElementById('uploaded-image');

    if (!imageInput) {
        alert("Please upload an image first.");
        return;
    }

    // Zobrazení obrázku
    const reader = new FileReader();
    reader.onload = function (e) {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = 'block';
    };
    reader.readAsDataURL(imageInput);

    // Vytvoření obrázkového elementu pro analýzu
    const img = new Image();
    img.src = URL.createObjectURL(imageInput);

    img.onload = function () {
        // Vytvoření plátna pro analýzu
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Získání dat pixelů
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Základní analýza: spočítání barev a detekce rozmazání
        let blurDetected = false;
        let colorCount = {};

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const alpha = pixels[i + 3];

            // Ignorování průhledných pixelů
            if (alpha === 0) continue;

            // Vytváření jedinečného klíče pro barvu
            const colorKey = `${r},${g},${b}`;

            // Počítání barev
            if (colorCount[colorKey]) {
                colorCount[colorKey]++;
            } else {
                colorCount[colorKey] = 1;
            }
        }

        // Zjištění, zda existuje příliš mnoho jedinečných barev (potenciálně rozmazaný obrázek)
        if (Object.keys(colorCount).length > 100) {
            blurDetected = true;
        }

        // Výstup výsledku
        if (blurDetected) {
            resultText.textContent = "The uploaded image might be AI generated due to high color diversity (blur detected).";
        } else {
            resultText.textContent = "The uploaded image seems to be real.";
        }
    };
}
