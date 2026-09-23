const express = require("express");

const upload = require("../middleware/newsUpload");

const {
  createNews,
  getNews,
  getNewsBySlug,
  updateNews,
  deleteNews,
  getNewsImage,
} = require("../controllers/newsController");

const router = express.Router();

/* =========================================
   GET ALL NEWS
========================================= */

router.get("/", getNews);

/* =========================================
   GET NEWS BY SLUG
========================================= */

router.get(
  "/slug/:slug",
  getNewsBySlug
);

/* =========================================
   GET NEWS IMAGE
========================================= */

router.get(
  "/image/:fileId",
  getNewsImage
);

/* =========================================
   CREATE NEWS
========================================= */

router.post(
  "/",
  upload.single("image"),
  createNews
);

/* =========================================
   UPDATE NEWS
========================================= */

router.put(
  "/:id",
  upload.single("image"),
  updateNews
);

/* =========================================
   DELETE NEWS
========================================= */

router.delete(
  "/:id",
  deleteNews
);

module.exports = router;