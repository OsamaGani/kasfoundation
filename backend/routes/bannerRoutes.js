
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

// Public: active banners enabled for homepage
// Admin panel: all banners via ?admin=true
router.get("/", getBanners);

// Public: banner image
router.get("/image/:fileId", getBannerImage);

// Admin-only: create banner or event
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  createBanner
);

// Admin-only: activate / deactivate
router.patch(
  "/:id/status",
  requireAdmin,
  updateBannerStatus
);

// Admin-only: delete banner and image
router.delete(
  "/:id",
  requireAdmin,
  deleteBanner
);

module.exports = router;
