import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index.js';
import multer from 'multer';


cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.API_KEY, 
    api_secret: config.API_SECRET
});

// Configure multer for file storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.secure_url);
            }
        });
    });
};


export { upload, uploadToCloudinary };
