const express = require("express");

const upload = require("../middleware/upload");

const {
  createGallery,
  getGalleries,
  getGalleryBySlug,
  updateGallery,
  deleteGallery,
  deletePhoto,
  getImage,
} = require("../controllers/galleryController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Gallery Routes
|--------------------------------------------------------------------------
*/

// Get all galleries
// Public: only active galleries
// Admin: /api/gallery?admin=true gets all galleries
router.get("/", getGalleries);

// Get single gallery by slug
router.get("/slug/:slug", getGalleryBySlug);

// Get image from MongoDB GridFS
router.get("/image/:fileId", getImage);

// Create new gallery
//
// Form-data fields:
// title
// isActive
// order
// coverImage -> single image
// photos -> multiple images
router.post(
  "/",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "photos",
      maxCount: 100,
    },
  ]),
  createGallery
);

// Update gallery
//
// Can update:
// title
// active/inactive
// order
// cover image
// add new photos
router.put(
  "/:id",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "photos",
      maxCount: 100,
    },
  ]),
  updateGallery
);

// Delete single photo
router.delete(
  "/:id/photo/:fileId",
  deletePhoto
);

// Delete complete gallery
router.delete(
  "/:id",
  deleteGallery
);

module.exports = router;