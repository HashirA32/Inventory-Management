import multer from "multer";
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error("Only image files are allowed"), false); 
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload
