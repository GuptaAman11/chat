const cloudinary = require('cloudinary').v2;
require('dotenv').config();
console.log(process.env.cloud_name) , console.log(process.env.api_key) , console.log(process.env.secret_key)
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
  });

module.exports = cloudinary ;