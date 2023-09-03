function fetchAndDisplayColorPalette() {
    const selectedColorMode = document.getElementById('color-mode').value;
    
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=0047AB&mode=${selectedColorMode}&count=2`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const colorPalette = data.colors.map(color => color.hex.value);
            displayColorPalette(colorPalette);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayColorPalette(colors) {
    const colorPaletteDiv = document.getElementById('color-palette');
    const html = colors.map(color => `<div style="background-color: ${color};"></div>`).join('');
    colorPaletteDiv.innerHTML = html;
}

document.querySelector('.fetch-btn').addEventListener('click', fetchAndDisplayColorPalette);
