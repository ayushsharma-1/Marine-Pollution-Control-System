document.addEventListener("DOMContentLoaded", function () {
    const cameraPreview = document.getElementById('camera-preview');

 navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
     .then((stream) => {
         cameraPreview.srcObject = stream;


         const canvas = document.createElement('canvas');
         const canvasContext = canvas.getContext('2d');

         function updateImagePreview() {
             canvas.width = cameraPreview.videoWidth;
             canvas.height = cameraPreview.videoHeight;
             canvasContext.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

             const imageContainer = document.getElementById('image-container');
             const uploadedImage = document.getElementById('uploaded-image');
             uploadedImage.src = canvas.toDataURL('image/jpeg');

             requestAnimationFrame(updateImagePreview);
         }

         updateImagePreview();
     })
     .catch((error) => {
         console.error('Error accessing the camera:', error);
     });


 const imageInput = document.getElementById('image-input');
 imageInput.addEventListener('change', handleImageInput);
});

function handleImageInput() {
 const imageContainer = document.getElementById('image-container');
 const uploadedImage = document.getElementById('uploaded-image');
 const imageInput = document.getElementById('image-input');

 const file = imageInput.files[0];

 if (file) {
     const reader = new FileReader();

     reader.onload = function (e) {
         uploadedImage.src = e.target.result;
         imageContainer.style.display = 'block';
     };

     reader.readAsDataURL(file);
 }
}

function submitForm() {

 alert('Form submitted!');
}
  let map, marker;
function initMap() {
    var defaultLocation = new google.maps.LatLng(28.6139, 77.2090);

    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 12
    });

    marker = new google.maps.Marker({
        map,
        draggable: true,
        position: defaultLocation
    });

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('location-pollution'));

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        const location = place.geometry.location;
        marker.setPosition(location);
    });

    google.maps.event.addListener(map, 'click', (event) => {
        marker.setPosition(event.latLng);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

function showLocationOnMap() {
    const locationInput = document.getElementById('location-pollution').value;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: locationInput }, function (results, status) {
        if (status === 'OK' && results && results[0] && results[0].geometry && results[0].geometry.location) {
            const location = results[0].geometry.location;

            map.setCenter(location);
            marker.setPosition(location);
        } else {
            console.error('Error geocoding address:', status);
        }
    });
}

function submitForm() {
    showLocationOnMap();
    const formData = gatherFormData();
    saveFormData(formData);
    alert('Form submitted!');
}
