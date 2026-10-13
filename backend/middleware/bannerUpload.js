const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  db: mongoose.connection,

  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname.replace(
      /[^a-zA-Z0-9._-]/g,
      "_"
    )}`,

    bucketName: "bannerImages",

    metadata: {
      originalName: file.originalname,
      contentType: file.mimetype,
    },
  }),
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowed.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Only JPG, PNG, WEBP and GIF images are allowed."));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});