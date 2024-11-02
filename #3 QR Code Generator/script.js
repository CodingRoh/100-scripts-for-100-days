const input = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeContainer = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');

function generateQRCode() {
    const text = input.value;
    qrCodeContainer.innerHTML = '';

    if (text.trim() === '') {
        alert('Please enter text or URL');
        return;
    }

    QRCode.toCanvas(text, {
        width: 200,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#ffffff'
        }
    }, (error, canvas) => {
        if (error) {
            console.error(error);
            alert('Could not generate QR Code');
        } else {
            qrCodeContainer.appendChild(canvas);
            downloadBtn.style.display = 'block';
        }
    });
}

function downloadQRCode() {
    const canvas = qrCodeContainer.querySelector('canvas');
    if (canvas) {
        const imageURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = 'qrcode.png';
        downloadLink.click();
    } else {
        alert('No QR code to download');
    }
}

generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQRCode);
