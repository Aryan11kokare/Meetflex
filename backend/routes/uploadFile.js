import multer from "multer";
import { Router } from "express";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

router.post("/upload", upload.single("media"), (req, res) => {
  try {
    res.json({ filename: req.file.filename });
  } catch (e) {
    console.log(e);
  }
});

export default router;
