const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d')
const imageLoader = document.getElementById('imageLoader');
let image = new Image();
let annotations = [];

imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    annotations.push({ x, y });
    ctx.fillStyle = 'red';
    ctx.fillrect(x - 5, y - 5, 10, 10);

});

document.getElementById('saveBtn').addEventListener('click', () => {
    fetch('/save_annotation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ annotations }),
        })
        .then(response => response.json())
        .then(data => alert('Annotation saved!'))
        .catch(error => console.error('ERROR:', error));
});