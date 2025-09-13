  import multer from "multer";
  import path from "path";
import fs from "fs";
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

  const excelStorage = multer.diskStorage({
     destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), "uploads", "excel");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  function excelFileFilter(req, file, cb) {
    const allowedMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel", 
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel files are allowed (.xlsx, .xls)"), false);
    }
  }

  
  const upload = multer({ storage: storage, fileFilter: fileFilter });
export const uploadExcel = multer({ storage: excelStorage, fileFilter: excelFileFilter });
  
  export default upload
