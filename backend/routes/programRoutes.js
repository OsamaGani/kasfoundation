const express = require("express");

const upload = require("../middleware/programUpload");

const {
  createProgram,
  getPrograms,
  getProgramBySlug,
  updateProgram,
  deleteProgram,
  getProgramImage,
} = require("../controllers/programController");

const router = express.Router();

/* =========================
   PUBLIC / ADMIN PROGRAMS
========================= */

router.get("/", getPrograms);

/* =========================
   PROGRAM BY SLUG
========================= */

router.get("/slug/:slug", getProgramBySlug);

/* =========================
   PROGRAM IMAGE
========================= */

router.get("/image/:fileId", getProgramImage);

/* =========================
   CREATE PROGRAM
========================= */

router.post(
  "/",
  upload.single("image"),
  createProgram
);

/* =========================
   UPDATE PROGRAM
========================= */

router.put(
  "/:id",
  upload.single("image"),
  updateProgram
);

/* =========================
   DELETE PROGRAM
========================= */

router.delete("/:id", deleteProgram);

module.exports = router;