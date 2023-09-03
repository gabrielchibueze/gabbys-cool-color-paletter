function displayColorPalette(colors) {
    const colorPaletteDiv = document.getElementById('color-palette');
    const html = colors.map(color => `<div style="background-color: ${color};"><h3 class="color-hex">${color}</h3></div>`).join('');
    colorPaletteDiv.innerHTML = html;
}

function fetchAndDisplayColorpalette (){
    const selectedColorMode = document.getElementById('select-color-mode').value

    const colorApi = `https://www.thecolorapi.com/scheme?hex=0047AB&mode=${selectedColorMode}&count=2`

    fetch(colorApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const retrievedColor = data.colors.map( (color) => color.hex.value)
            displayColorPalette (retrievedColor)
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

document.querySelector('.fetch-btn').addEventListener('click', fetchAndDisplayColorpalette)

document.querySelector('.color-palette').addEventListener('click', copyHexCode)

function copyHexCode(e) {
   const clickedEvent = e.target
   if(clickedEvent.classList.contains('color-hex')){
        const hexCode = clickedEvent.textContent

        const textarea = document.createElement('textarea')

        textarea.value = hexCode

        document.body.appendChild(textarea)
        textarea.select()

        document.execCommand('copy')
        document.body.removeChild(textarea)

        clickedEvent.style.backgroundColor = "whitesmoke"
        clickedEvent.style.textContent = "copied"

        setTimeout (()=>{
            clickedEvent.style.backgroundColor = ""

        },1000)
   }
}