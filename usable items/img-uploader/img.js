document
  .getElementById("upload-input")
  .addEventListener("change", displayImage);

function displayImage() {
  const input = document.getElementById("upload-input");
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageDataUrl = event.target.result;
      updateImageSrc(imageDataUrl);
    };
    reader.onerror = function (error) {
      console.error("Error reading the file:", error);
    };
    reader.readAsDataURL(file);
  }
}

function updateImageSrc(src) {
  const uploadedImage = document.getElementById("uploaded-image");
  uploadedImage.src = src;
}