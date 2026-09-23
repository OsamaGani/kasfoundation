const mongoose = require("mongoose");

const Venue = require("../models/Venue");

const BUCKET_NAME = "venueImages";

const getBucket = () => {
  return new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    {
      bucketName: BUCKET_NAME,
    }
  );
};

const deleteGridFSFile = async (
  fileId
) => {
  if (!fileId) {
    return;
  }

  try {
    const bucket = getBucket();

    await bucket.delete(fileId);
  } catch (error) {
    console.error(
      "Venue image delete error:",
      error.message
    );
  }
};


/* =========================================
   CREATE VENUE
========================================= */

const createVenue = async (
  req,
  res
) => {
  try {
    const {
      label,
      name,
      description,
      isActive,
      order,
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Venue name and description are required.",
      });
    }

    const image = req.file
      ? {
          fileId: req.file.id,
          filename: req.file.filename,
        }
      : {
          fileId: null,
          filename: "",
        };

    const venue =
      await Venue.create({
        label:
          label || "VENUES",

        name,

        description,

        image,

        isActive:
          isActive !== undefined
            ? isActive === "true" ||
              isActive === true
            : true,

        order:
          order !== undefined
            ? Number(order)
            : 0,
      });

    return res.status(201).json({
      success: true,
      message:
        "Venue created successfully.",
      venue,
    });
  } catch (error) {
    console.error(
      "Create venue error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create venue.",
      error: error.message,
    });
  }
};


/* =========================================
   GET VENUES
========================================= */

const getVenues = async (
  req,
  res
) => {
  try {
    const isAdmin =
      req.query.admin === "true";

    const filter = isAdmin
      ? {}
      : {
          isActive: true,
        };

    const venues =
      await Venue.find(filter)
        .sort({
          order: 1,
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: venues.length,
      venues,
    });
  } catch (error) {
    console.error(
      "Get venues error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch venues.",
      error: error.message,
    });
  }
};


/* =========================================
   GET SINGLE VENUE
========================================= */

const getVenueById = async (
  req,
  res
) => {
  try {
    const venue =
      await Venue.findById(
        req.params.id
      );

    if (!venue) {
      return res.status(404).json({
        success: false,
        message:
          "Venue not found.",
      });
    }

    return res.status(200).json({
      success: true,
      venue,
    });
  } catch (error) {
    console.error(
      "Get venue error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch venue.",
      error: error.message,
    });
  }
};


/* =========================================
   UPDATE VENUE
========================================= */

const updateVenue = async (
  req,
  res
) => {
  try {
    const venue =
      await Venue.findById(
        req.params.id
      );

    if (!venue) {
      return res.status(404).json({
        success: false,
        message:
          "Venue not found.",
      });
    }

    const {
      label,
      name,
      description,
      isActive,
      order,
    } = req.body;

    if (label !== undefined) {
      venue.label = label;
    }

    if (name !== undefined) {
      venue.name = name;
    }

    if (description !== undefined) {
      venue.description =
        description;
    }

    if (isActive !== undefined) {
      venue.isActive =
        isActive === "true" ||
        isActive === true;
    }

    if (order !== undefined) {
      venue.order = Number(order);
    }


    /* =====================================
       NEW IMAGE
    ===================================== */

    if (req.file) {
      const oldFileId =
        venue.image?.fileId;

      venue.image = {
        fileId: req.file.id,
        filename:
          req.file.filename,
      };

      if (oldFileId) {
        await deleteGridFSFile(
          oldFileId
        );
      }
    }


    await venue.save();

    return res.status(200).json({
      success: true,
      message:
        "Venue updated successfully.",
      venue,
    });
  } catch (error) {
    console.error(
      "Update venue error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update venue.",
      error: error.message,
    });
  }
};


/* =========================================
   DELETE VENUE
========================================= */

const deleteVenue = async (
  req,
  res
) => {
  try {
    const venue =
      await Venue.findById(
        req.params.id
      );

    if (!venue) {
      return res.status(404).json({
        success: false,
        message:
          "Venue not found.",
      });
    }

    const fileId =
      venue.image?.fileId;

    if (fileId) {
      await deleteGridFSFile(
        fileId
      );
    }

    await Venue.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Venue deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete venue error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete venue.",
      error: error.message,
    });
  }
};


/* =========================================
   GET VENUE IMAGE
========================================= */

const getVenueImage = async (
  req,
  res
) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.fileId
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid image ID.",
      });
    }

    const fileId =
      new mongoose.Types.ObjectId(
        req.params.fileId
      );

    const bucket = getBucket();

    const files =
      await mongoose.connection.db
        .collection(
          `${BUCKET_NAME}.files`
        )
        .find({
          _id: fileId,
        })
        .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message:
          "Venue image not found.",
      });
    }

    const file = files[0];

    res.set(
      "Content-Type",
      file.contentType ||
        "application/octet-stream"
    );

    const downloadStream =
      bucket.openDownloadStream(
        fileId
      );

    downloadStream.on(
      "error",
      (error) => {
        console.error(
          "Venue image stream error:",
          error
        );

        if (!res.headersSent) {
          res.status(404).json({
            success: false,
            message:
              "Unable to load venue image.",
          });
        }
      }
    );

    downloadStream.pipe(res);
  } catch (error) {
    console.error(
      "Get venue image error:",
      error
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to load venue image.",
        error: error.message,
      });
    }
  }
};


module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getVenueImage,
};