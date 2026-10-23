import multer from "multer";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    const allowedType = ["image/png","image/jpg", "image/jpeg"];
    if (!allowedType.includes(file.mimetype)) {
      return cb(new Error("invalid format"));
    }
    cb(null, true);
  };

  return multer({ storage, fileFilter });
};
