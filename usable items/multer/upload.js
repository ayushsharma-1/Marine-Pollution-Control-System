const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use(express.static('uploads'));

// Route to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    // Access the uploaded image using req.file
    console.log('File uploaded:', req.file);

    // Send a response
    res.send('Image uploaded successfully!');
});
const publicPath = path.join(__dirname,);
app.use(express.static(publicPath, { index: 'upload.html' }));

app.get('*', (_, res) => {
  res.sendFile(path.join(publicPath, 'upload.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
