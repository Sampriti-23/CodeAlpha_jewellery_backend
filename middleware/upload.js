const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. Configure Cloudinary with your account credentials
// It is highly recommended to store these in a .env file rather than hardcoding them
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure where and how the files are saved in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // This creates a specific folder in your Cloudinary dashboard, 
    // keeping your Friendwave media organized apart from other projects.
    folder: 'friendwave_media', 
    // Restrict the types of files users can upload
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], 
  },
});

// 3. Initialize multer with the Cloudinary storage engine
const upload = multer({ storage: storage });

module.exports = upload;

//const multer = require('multer');
//const path = require('path');

// Configure where and how the files are saved
//const storage = multer.diskStorage({
   // destination: function (req, file, cb) {
     //   cb(null, 'uploads/'); // Saves files to the 'uploads' folder
  //  },
    //filename: function (req, file, cb) {
        // Renames the file to be unique: 1689234234-image.jpg
      //  cb(null, Date.now() + path.extname(file.originalname));
    //}
//});

// Initialize multer with the storage engine
//const upload = multer({ storage: storage });

//module.exports = upload;