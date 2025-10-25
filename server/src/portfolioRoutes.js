import { Router } from "express";
import { createPortfolio } from "./portfolioController.js";
import { upload } from "./multer.js";

const router = Router();

router.post(
  "/",
  upload.fields([
    { name: "heroImg", maxCount: 1 },
    { name: "profileImg", maxCount: 1 },
  ]),
  createPortfolio
);

export default router;
