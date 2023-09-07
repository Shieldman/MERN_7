const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'avatars',
      allowFormats: ['jpg','png','jpeg','gif']
    },
  });
const carsImages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'cars',
      allowFormats: ['jpg','png','jpeg','gif']
    },
  });

  const uploadFile = multer({storage:storage})
  const uploadCarFile = multer({storage:carsImages})

  module.exports = {
    uploadFile,
    uploadCarFile
  }