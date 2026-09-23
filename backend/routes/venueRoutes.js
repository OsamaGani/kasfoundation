const express = require("express");

const upload = require("../middleware/venueUpload");

const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getVenueImage,
} = require("../controllers/venueController");

const router = express.Router();

router.get("/", getVenues);

router.get(
  "/image/:fileId",
  getVenueImage
);

router.get(
  "/:id",
  getVenueById
);

router.post(
  "/",
  upload.single("image"),
  createVenue
);

router.put(
  "/:id",
  upload.single("image"),
  updateVenue
);

router.delete(
  "/:id",
  deleteVenue
);

module.exports = router;