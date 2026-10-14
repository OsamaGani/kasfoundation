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
// Public: active banners enabled for homepage
// Admin: all banners with ?admin=true
exports.getBanners = async (req, res) => {
  try {
    const isAdminRequest = req.query.admin === "true";

    const filter = isAdminRequest
      ? {}
      : {
          isActive: true,
          showOnHomepage: true,
        };

    const banners = await Banner.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      banners,
    });
  } catch (error) {
    console.error("Get banners error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not fetch banners.",
    });
  }
};

// GET one active event by ID
// Used by the public Event Details page
exports.getBannerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const banner = await Banner.findOne({
      _id: id,
      isActive: true,
    }).lean();

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Event not found or is no longer active.",
      });
    }

    return res.status(200).json({
      success: true,
      banner,
    });
  } catch (error) {
    console.error("Get event details error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not fetch event details.",
    });
  }
};

// GET banner image from GridFS
exports.getBannerImage = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.fileId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image ID.",
      });
    }

    const bucket = getBucket();

    const fileId = new mongoose.Types.ObjectId(
      req.params.fileId
    );

    const files = await bucket
      .find({ _id: fileId })
      .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "Banner image not found.",
      });
    }

    res.set(
      "Content-Type",
      files[0].metadata?.contentType || "image/jpeg"
    );

    res.set("Cache-Control", "public, max-age=3600");

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", (error) => {
      console.error("Banner image stream error:", error);

      if (!res.headersSent) {
        res.status(404).end();
      }
    });

    return downloadStream.pipe(res);
  } catch (error) {
    console.error("Get banner image error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Could not load banner image.",
      });
    }
  }
};

// CREATE banner / event
exports.createBanner = async (req, res) => {
  try {
    // Confirm multipart form fields reached the controller.
    console.log("Banner upload received:", {
      bodyFields: Object.keys(req.body || {}),
      titleReceived: Boolean(req.body?.title),
      shortDescriptionReceived: Boolean(
        req.body?.shortDescription
      ),
      fullDescriptionReceived: Boolean(
        req.body?.fullDescription
      ),
      fileReceived: Boolean(req.file),
    });

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a banner image.",
      });
    }

    // Read text fields from multipart/form-data.
    const title = cleanText(req.body?.title);
    const shortDescription = cleanText(
      req.body?.shortDescription
    );
    const fullDescription = cleanText(
      req.body?.fullDescription
    );
    const category =
      cleanText(req.body?.category) || "Announcement";
    const buttonText =
      cleanText(req.body?.buttonText) || "Learn More";
    const registrationUrl = cleanText(
      req.body?.registrationUrl
    );

    const allowedCategories = [
      "Event",
      "Challenge",
      "Announcement",
      "News",
      "Other",
    ];

    // Prevent accidentally creating image-only events.
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Event title receive nahi hua. Form dobara check karo.",
      });
    }

    if (!shortDescription) {
      return res.status(400).json({
        success: false,
        message: "Short description receive nahi hui.",
      });
    }

    if (!fullDescription) {
      return res.status(400).json({
        success: false,
        message: "Full event details receive nahi hui.",
      });
    }

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
        message: "Full description maximum 10000 characters ka ho sakta hai.",
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

    // Save all event fields.
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
        req.body?.showOnHomepage,
        true
      ),
      isActive: parseBoolean(
        req.body?.isActive,
        true
      ),
    });

    console.log("Banner saved:", {
      id: banner._id,
      title: banner.title,
      category: banner.category,
    });

    return res.status(201).json({
      success: true,
      message: "Event uploaded successfully.",
      banner,
    });
  } catch (error) {
    console.error("Create banner error:", error);

    return res.status(500).json({
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

    banner.isActive = parseBoolean(
      req.body?.isActive
    );

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Banner status updated.",
      banner,
    });
  } catch (error) {
    console.error("Update banner status error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not update banner status.",
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
      } catch (error) {
        console.error(
          "Banner image cleanup failed:",
          error.message
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Banner deleted.",
    });
  } catch (error) {
    console.error("Delete banner error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not delete banner.",
    });
  }
};