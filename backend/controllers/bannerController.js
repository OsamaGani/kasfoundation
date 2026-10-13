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

exports.getBanners = async (req, res) => {
  try {
    const filter =
      req.query.admin === "true" ? {} : { isActive: true };

    const banners = await Banner.find(filter).sort({
      createdAt: -1,
    });

    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not fetch banners.",
    });
  }
};

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
        if (!res.headersSent) res.status(404).end();
      })
      .pipe(res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not load banner image.",
    });
  }
};

exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a banner image.",
      });
    }

    const banner = await Banner.create({
      image: {
        fileId: req.file.id,
        filename: req.file.filename,
      },
      isActive: req.body.isActive === "false" ? false : true,
    });

    res.status(201).json({
      success: true,
      message: "Banner uploaded successfully.",
      banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not upload banner.",
    });
  }
};

exports.updateBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    banner.isActive =
      req.body.isActive === true ||
      req.body.isActive === "true";

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

exports.deleteBanner = async (req, res) => {
  try {
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