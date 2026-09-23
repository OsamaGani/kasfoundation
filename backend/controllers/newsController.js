const mongoose = require("mongoose");

const News = require("../models/News");

const BUCKET_NAME = "newsImages";

/* =========================================
   GRIDFS BUCKET
========================================= */

const getBucket = () => {
  if (!mongoose.connection.db) {
    throw new Error("MongoDB database connection is not ready.");
  }

  return new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    {
      bucketName: BUCKET_NAME,
    }
  );
};

/* =========================================
   SLUG GENERATOR
========================================= */

const generateSlug = (text) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/* =========================================
   DELETE GRIDFS IMAGE
========================================= */

const deleteGridFSFile = async (fileId) => {
  if (!fileId) {
    return;
  }

  try {
    const bucket = getBucket();

    await bucket.delete(
      new mongoose.Types.ObjectId(fileId)
    );
  } catch (error) {
    console.error(
      "GridFS image delete error:",
      error.message
    );
  }
};

/* =========================================
   CREATE NEWS
========================================= */

const createNews = async (req, res) => {
  try {
    const {
      title,
      date,
      slug,
      shortDescription,
      description,
      isActive,
      order,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "News title is required.",
      });
    }

    if (!date || !date.trim()) {
      return res.status(400).json({
        success: false,
        message: "News date is required.",
      });
    }

    let finalSlug = slug && slug.trim()
      ? generateSlug(slug)
      : generateSlug(title);

    const existingNews = await News.findOne({
      slug: finalSlug,
    });

    if (existingNews) {
      return res.status(409).json({
        success: false,
        message:
          "A news article with this slug already exists.",
      });
    }

    const news = new News({
      title: title.trim(),

      slug: finalSlug,

      date: date.trim(),

      shortDescription:
        shortDescription
          ? shortDescription.trim()
          : "",

      description:
        description
          ? description.trim()
          : "",

      isActive:
        isActive === undefined
          ? true
          : isActive === true ||
            isActive === "true",

      order:
        order !== undefined &&
        order !== ""
          ? Number(order)
          : 0,

      image: {
        fileId: req.file
          ? req.file.id
          : null,

        filename: req.file
          ? req.file.filename
          : "",
      },
    });

    await news.save();

    return res.status(201).json({
      success: true,
      message: "News created successfully.",
      news,
    });
  } catch (error) {
    console.error(
      "Create news error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create news.",
    });
  }
};

/* =========================================
   GET ALL NEWS
========================================= */

const getNews = async (req, res) => {
  try {
    const isAdmin =
      req.query.admin === "true";

    const filter = isAdmin
      ? {}
      : {
          isActive: true,
        };

    const news = await News.find(filter)
      .sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    console.error(
      "Get news error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch news.",
    });
  }
};

/* =========================================
   GET NEWS BY SLUG
========================================= */

const getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const news = await News.findOne({
      slug,
      isActive: true,
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    return res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    console.error(
      "Get news by slug error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch news article.",
    });
  }
};

/* =========================================
   UPDATE NEWS
========================================= */

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    const {
      title,
      date,
      slug,
      shortDescription,
      description,
      isActive,
      order,
    } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "News title cannot be empty.",
        });
      }

      news.title = title.trim();
    }

    if (date !== undefined) {
      if (!date.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "News date cannot be empty.",
        });
      }

      news.date = date.trim();
    }

    if (slug !== undefined) {
      const newSlug = slug.trim()
        ? generateSlug(slug)
        : generateSlug(news.title);

      const existingNews =
        await News.findOne({
          slug: newSlug,
          _id: {
            $ne: news._id,
          },
        });

      if (existingNews) {
        return res.status(409).json({
          success: false,
          message:
            "Another news article already uses this slug.",
        });
      }

      news.slug = newSlug;
    }

    if (
      shortDescription !== undefined
    ) {
      news.shortDescription =
        shortDescription.trim();
    }

    if (
      description !== undefined
    ) {
      news.description =
        description.trim();
    }

    if (isActive !== undefined) {
      news.isActive =
        isActive === true ||
        isActive === "true";
    }

    if (order !== undefined) {
      news.order =
        order === ""
          ? 0
          : Number(order);
    }

    /* =====================================
       NEW IMAGE
    ===================================== */

    if (req.file) {
      const oldFileId =
        news.image?.fileId;

      news.image = {
        fileId: req.file.id,
        filename: req.file.filename,
      };

      if (oldFileId) {
        await deleteGridFSFile(
          oldFileId
        );
      }
    }

    await news.save();

    return res.status(200).json({
      success: true,
      message:
        "News updated successfully.",
      news,
    });
  } catch (error) {
    console.error(
      "Update news error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update news.",
    });
  }
};

/* =========================================
   DELETE NEWS
========================================= */

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found.",
      });
    }

    if (news.image?.fileId) {
      await deleteGridFSFile(
        news.image.fileId
      );
    }

    await News.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "News deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete news error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete news.",
    });
  }
};

/* =========================================
   GET NEWS IMAGE
========================================= */

const getNewsImage = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        fileId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid image ID.",
      });
    }

    const objectId =
      new mongoose.Types.ObjectId(
        fileId
      );

    const bucket = getBucket();

    const files =
      await mongoose.connection.db
        .collection(
          `${BUCKET_NAME}.files`
        )
        .find({
          _id: objectId,
        })
        .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const file = files[0];

    if (
      file.metadata &&
      file.metadata.contentType
    ) {
      res.set(
        "Content-Type",
        file.metadata.contentType
      );
    } else {
      res.set(
        "Content-Type",
        "application/octet-stream"
      );
    }

    res.set(
      "Cache-Control",
      "public, max-age=31536000"
    );

    const downloadStream =
      bucket.openDownloadStream(
        objectId
      );

    downloadStream.on(
      "error",
      (error) => {
        console.error(
          "GridFS image stream error:",
          error
        );

        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message:
              "Failed to load image.",
          });
        }
      }
    );

    downloadStream.pipe(res);
  } catch (error) {
    console.error(
      "Get news image error:",
      error
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to load image.",
      });
    }
  }
};

module.exports = {
  createNews,
  getNews,
  getNewsBySlug,
  updateNews,
  deleteNews,
  getNewsImage,
};