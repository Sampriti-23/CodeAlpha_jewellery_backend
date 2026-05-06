const multer = require('multer');
const path = require('path');

// Configure where and how the files are saved
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Saves files to the 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Renames the file to be unique: 1689234234-image.jpg
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

module.exports = upload;