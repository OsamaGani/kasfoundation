const mongoose = require("mongoose");
const Gallery = require("../models/Gallery");

const getBucket = () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("MongoDB database connection is not ready.");
  }

  return new mongoose.mongo.GridFSBucket(db, {
    bucketName: "galleryImages",
  });
};

// Create Gallery
const createGallery = async (req, res) => {
  try {
    const { title, isActive, order } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Gallery title is required.",
      });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery title.",
      });
    }

    const existingGallery = await Gallery.findOne({ slug });

    if (existingGallery) {
      return res.status(409).json({
        success: false,
        message: "A gallery with this title already exists.",
      });
    }

    const coverFile = req.files?.coverImage?.[0];
    const photoFiles = req.files?.photos || [];

    if (!coverFile) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required.",
      });
    }

    const gallery = await Gallery.create({
      title: title.trim(),
      slug,

      coverImage: {
        fileId: coverFile.id,
        filename: coverFile.filename,
      },

      photos: photoFiles.map((file) => ({
        fileId: file.id,
        filename: file.filename,
      })),

      isActive:
        isActive === undefined
          ? true
          : String(isActive).toLowerCase() === "true",

      order: Number(order) || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery created successfully.",
      gallery,
    });
  } catch (error) {
    console.error("Create Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create gallery.",
      error: error.message,
    });
  }
};

// Get All Galleries
const getGalleries = async (req, res) => {
  try {
    const { admin } = req.query;

    let query = {};

    // Public website gets only active galleries.
    // Admin can request all galleries using ?admin=true
    if (admin !== "true") {
      query.isActive = true;
    }

    const galleries = await Gallery.find(query).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: galleries.length,
      gallery: galleries,
    });
  } catch (error) {
    console.error("Get Galleries Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch galleries.",
      error: error.message,
    });
  }
};

// Get Single Gallery By Slug
const getGalleryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const gallery = await Gallery.findOne({
      slug,
      isActive: true,
    });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    return res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error("Get Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery.",
      error: error.message,
    });
  }
};

// Update Gallery
const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isActive, order } = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    if (title && title.trim()) {
      const newTitle = title.trim();

      const newSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");

      const duplicateGallery = await Gallery.findOne({
        slug: newSlug,
        _id: { $ne: id },
      });

      if (duplicateGallery) {
        return res.status(409).json({
          success: false,
          message: "Another gallery with this title already exists.",
        });
      }

      gallery.title = newTitle;
      gallery.slug = newSlug;
    }

    if (isActive !== undefined) {
      gallery.isActive =
        String(isActive).toLowerCase() === "true";
    }

    if (order !== undefined) {
      gallery.order = Number(order) || 0;
    }

    const newCoverFile = req.files?.coverImage?.[0];

    if (newCoverFile) {
      const oldCoverFileId = gallery.coverImage?.fileId;

      gallery.coverImage = {
        fileId: newCoverFile.id,
        filename: newCoverFile.filename,
      };

      if (oldCoverFileId) {
        await deleteGridFSFile(oldCoverFileId);
      }
    }

    const newPhotoFiles = req.files?.photos || [];

    if (newPhotoFiles.length > 0) {
      const newPhotos = newPhotoFiles.map((file) => ({
        fileId: file.id,
        filename: file.filename,
      }));

      gallery.photos.push(...newPhotos);
    }

    await gallery.save();

    return res.status(200).json({
      success: true,
      message: "Gallery updated successfully.",
      gallery,
    });
  } catch (error) {
    console.error("Update Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update gallery.",
      error: error.message,
    });
  }
};

// Delete Gallery
const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    // Delete cover image from GridFS
    if (gallery.coverImage?.fileId) {
      await deleteGridFSFile(gallery.coverImage.fileId);
    }

    // Delete all gallery photos from GridFS
    for (const photo of gallery.photos) {
      if (photo.fileId) {
        await deleteGridFSFile(photo.fileId);
      }
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Gallery deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery.",
      error: error.message,
    });
  }
};

// Delete Single Photo
const deletePhoto = async (req, res) => {
  try {
    const { id, fileId } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found.",
      });
    }

    const photoIndex = gallery.photos.findIndex(
      (photo) => photo.fileId.toString() === fileId
    );

    if (photoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Photo not found in this gallery.",
      });
    }

    await deleteGridFSFile(fileId);

    gallery.photos.splice(photoIndex, 1);

    await gallery.save();

    return res.status(200).json({
      success: true,
      message: "Photo deleted successfully.",
      gallery,
    });
  } catch (error) {
    console.error("Delete Photo Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete photo.",
      error: error.message,
    });
  }
};

// Serve Image From GridFS
const getImage = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image ID.",
      });
    }

    const bucket = getBucket();

    const files = await bucket
      .find({
        _id: new mongoose.Types.ObjectId(fileId),
      })
      .toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const file = files[0];

    res.set("Content-Type", file.contentType || "image/jpeg");

    res.set(
      "Content-Disposition",
      `inline; filename="${file.filename}"`
    );

    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    downloadStream.on("error", (error) => {
      console.error("GridFS Download Error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Failed to load image.",
        });
      }
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Get Image Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load image.",
      error: error.message,
    });
  }
};

// Delete GridFS File Helper
const deleteGridFSFile = async (fileId) => {
  try {
    if (!fileId) {
      return;
    }

    const bucket = getBucket();

    await bucket.delete(new mongoose.Types.ObjectId(fileId));
  } catch (error) {
    console.error(
      "GridFS File Delete Error:",
      error.message
    );
  }
};

module.exports = {
  createGallery,
  getGalleries,
  getGalleryBySlug,
  updateGallery,
  deleteGallery,
  deletePhoto,
  getImage,
};