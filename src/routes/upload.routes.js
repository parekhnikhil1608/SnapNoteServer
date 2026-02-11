const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "notes-app", allowed_formats: ["jpg", "png", "jpeg", "webp"] },
});

const upload = multer({ storage });

module.exports = (app) => {
  app.post("/upload", upload.single("image"), (req, res) => {
    res.json({
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });
  });
};
