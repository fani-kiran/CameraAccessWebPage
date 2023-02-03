// Define HTML elements
const video = document.createElement('video');
const canvas = document.createElement('canvas');
const photoContainer = document.getElementById('photo-container');
const takePhotoButton = document.getElementById('take-photo-button');
const savePhotoButton = document.getElementById('save-photo-button');

// Request access to user's camera and set video stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  });

// Take photo and update button with photo
takePhotoButton.addEventListener('click', () => {
  // Draw image from video to canvas
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  
  // Clear previous content and add canvas to photo container
  photoContainer.innerHTML = '';
  photoContainer.appendChild(canvas);
  
  // Set background image of button to the photo
  takePhotoButton.style.backgroundImage = `url(${canvas.toDataURL()})`;
  takePhotoButton.style.backgroundSize = 'cover';
});

// Save photo as PNG
savePhotoButton.addEventListener('click', () => {
  canvas.toBlob(function(blob) {
    // Create a download link for the PNG image
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = URL.createObjectURL(blob);
    link.click();
  });
});
// JavaScript Document