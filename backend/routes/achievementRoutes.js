const express = require("express");

const upload = require(
  "../middleware/achievementUpload"
);

const {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  getAchievementImage,
} = require(
  "../controllers/achievementController"
);

const router = express.Router();

router.get(
  "/",
  getAchievements
);

router.get(
  "/image/:fileId",
  getAchievementImage
);

router.get(
  "/:id",
  getAchievementById
);

router.post(
  "/",
  upload.single("image"),
  createAchievement
);

router.put(
  "/:id",
  upload.single("image"),
  updateAchievement
);

router.delete(
  "/:id",
  deleteAchievement
);

module.exports = router;