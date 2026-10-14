
const mongoose = require("mongoose");
const Banner = require("../models/Banner");

const BUCKET_NAME = "bannerImages";

const getBucket = () => {
  if (!mongoose.connection.db) {
    throw new Error("MongoDB connection is not ready.");
  }

  return new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    { bucketName: BUCKET_NAME }
  );
};

const parseBoolean = (value, fallback = false) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  return value === true || value === "true";
};

const cleanText = (value) => {
  return typeof value === "string" ? value.trim() : "";
};

const isValidOptionalUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);

    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

// GET banners
// Public: only active banners enabled for homepage
// Admin: all banners when ?admin=true
exports.getBanners = async (req, res) => {
  try {
    const isAdminRequest = req.query.admin === "true";

    const filter = isAdminRequest
      ? {}
      : {
          isActive: true,
          showOnHomepage: true,
        };

    const banners = await Banner.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not fetch banners.",
    });
  }
};

// GET banner image from GridFS
exports.getBannerImage = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.fileId)) {
      return res.status(400).json({
        message: "Invalid image ID.",
      });
    }

    const bucket = getBucket();

    const files = await bucket
      .find({
        _id: new mongoose.Types.ObjectId(req.params.fileId),
      })
      .toArray();

    if (!files.length) {
      return res.status(404).json({
        message: "Banner image not found.",
      });
    }

    res.set(
      "Content-Type",
      files[0].metadata?.contentType || "image/jpeg"
    );

    res.set("Cache-Control", "public, max-age=3600");

    bucket
      .openDownloadStream(files[0]._id)
      .on("error", () => {
        if (!res.headersSent) {
          res.status(404).end();
        }
      })
      .pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not load banner image.",
    });
  }
};

// CREATE banner / event
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a banner image.",
      });
    }

    const title = cleanText(req.body.title);
    const shortDescription = cleanText(
      req.body.shortDescription
    );
    const fullDescription = cleanText(
      req.body.fullDescription
    );
    const category = cleanText(
      req.body.category
    ) || "Announcement";
    const buttonText = cleanText(
      req.body.buttonText
    ) || "Learn More";
    const registrationUrl = cleanText(
      req.body.registrationUrl
    );

    const allowedCategories = [
      "Event",
      "Challenge",
      "Announcement",
      "News",
      "Other",
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid banner category.",
      });
    }

    if (title.length > 120) {
      return res.status(400).json({
        success: false,
        message: "Title maximum 120 characters ka ho sakta hai.",
      });
    }

    if (shortDescription.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Short description maximum 200 characters ka ho sakta hai.",
      });
    }

    if (fullDescription.length > 10000) {
      return res.status(400).json({
        success: false,
        message: "Full description bahut lamba hai.",
      });
    }

    if (buttonText.length > 40) {
      return res.status(400).json({
        success: false,
        message: "Button text maximum 40 characters ka ho sakta hai.",
      });
    }

    if (!isValidOptionalUrl(registrationUrl)) {
      return res.status(400).json({
        success: false,
        message: "Registration URL valid HTTP/HTTPS link hona chahiye.",
      });
    }

    const banner = await Banner.create({
      image: {
        fileId: req.file.id,
        filename: req.file.filename,
      },

      title,
      shortDescription,
      fullDescription,
      category,
      buttonText,
      registrationUrl,

      showOnHomepage: parseBoolean(
        req.body.showOnHomepage,
        true
      ),

      isActive: parseBoolean(
        req.body.isActive,
        true
      ),
    });

    res.status(201).json({
      success: true,
      message: "Banner/event uploaded successfully.",
      banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not upload banner.",
    });
  }
};

// ACTIVATE / DEACTIVATE banner
exports.updateBannerStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid banner ID.",
      });
    }

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    banner.isActive = parseBoolean(req.body.isActive);

    await banner.save();

    res.json({
      success: true,
      message: "Banner status updated.",
      banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not update banner.",
    });
  }
};

// DELETE banner and its GridFS image
exports.deleteBanner = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid banner ID.",
      });
    }

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    await banner.deleteOne();

    if (banner.image?.fileId) {
      try {
        await getBucket().delete(
          new mongoose.Types.ObjectId(banner.image.fileId)
        );
      } catch (err) {
        console.error(
          "Banner image cleanup failed:",
          err.message
        );
      }
    }

    res.json({
      success: true,
      message: "Banner deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not delete banner.",
    });
  }
};
