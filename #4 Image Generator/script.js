document.getElementById('generate-btn').addEventListener('click', generateImage);

async function generateImage() {
    const description = document.getElementById('description-input').value.trim();
    const generatedImage = document.getElementById('generated-image');

    if (description === "") {
        alert("Please enter a description or keyword.");
        return;
    }

    try {
        // Volání Unsplash API pro vyhledání obrázku podle klíčového slova
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${description}&client_id=8IpaD4ofYW01IyJuVGdyIkZWJzqo_sngxcM8aaBORo4`);
        
        if (!response.ok) {
            throw new Error("Could not fetch image.");
        }

        const data = await response.json();
        generatedImage.src = data.urls.regular;
        generatedImage.style.display = 'block';
    } catch (error) {
        alert("Image could not be generated. Try another keyword.");
        console.error(error);
    }
}
