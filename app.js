// Define HTML elements
// Create video, canvas, and photo container elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const previewContainer = document.getElementById('preview-container');
const takePhotoButton = document.getElementById('take-photo-button');
const photoContainer = document.getElementById('photo-container');

// Get the camera stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    previewContainer.style.backgroundImage = `url(${URL.createObjectURL(stream)})`;
  });

// Take a photo when the take photo button is clicked
takePhotoButton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  previewContainer.style.backgroundImage = '';
  previewContainer.style.display = 'none';
  photoContainer.innerHTML = '';
  photoContainer.appendChild(canvas);
});

// Save the full page as a PDF when the photo is taken
window.addEventListener('DOMContentLoaded', function() {
  const doc = new jsPDF();
  doc.addHTML(document.body, function() {
    doc.save('page.pdf');
  });
});

// JavaScript Document