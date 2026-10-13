const express = require("express");

const upload = require("../middleware/bannerUpload");
const requireAdmin = require("../middleware/requireAdmin");

const {
  getBanners,
  getBannerImage,
  createBanner,
  updateBannerStatus,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

// Public: homepage ke active banners
router.get("/", getBanners);

// Public: banner image
router.get("/image/:fileId", getBannerImage);

// Admin-only actions
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  createBanner
);

router.patch(
  "/:id/status",
  requireAdmin,
  updateBannerStatus
);

router.delete(
  "/:id",
  requireAdmin,
  deleteBanner
);

module.exports = router;