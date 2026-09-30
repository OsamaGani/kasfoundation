const mongoose = require("mongoose");
const Program = require("../models/Program");

const bucket = () =>
  new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "programImages",
  });

const createSlug = (title) => {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/* =========================
   CREATE PROGRAM
========================= */

const createProgram = async (req, res) => {
  try {
    const {
      title,
      category,
      shortDescription,
      description,
      isActive,
      order,
    } = req.body;

    if (!title || !shortDescription || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title, short description and full description are required.",
      });
    }

    let slug = createSlug(title);

    const existingProgram = await Program.findOne({ slug });

    if (existingProgram) {
      slug = `${slug}-${Date.now()}`;
    }

    const program = new Program({
      title,
      slug,
      category: category || "",
      shortDescription,
      description,
      image: {
        fileId: req.file ? req.file.id : null,
        filename: req.file ? req.file.filename : "",
      },
      isActive:
        isActive === undefined
          ? true
          : isActive === "true" || isActive === true,
      order: Number(order) || 0,
    });

    await program.save();

    res.status(201).json({
      success: true,
      message: "Program created successfully.",
      program,
    });
  } catch (error) {
    console.error("Create Program Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create program.",
      error: error.message,
    });
  }
};

/* =========================
   GET PROGRAMS
========================= */

const getPrograms = async (req, res) => {
  try {
    const isAdmin = req.query.admin === "true";

    const filter = isAdmin ? {} : { isActive: true };

    const programs = await Program.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: programs.length,
      programs,
    });
  } catch (error) {
    console.error("Get Programs Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch programs.",
      error: error.message,
    });
  }
};

/* =========================
   GET PROGRAM BY SLUG
========================= */

const getProgramBySlug = async (req, res) => {
  try {
    const program = await Program.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    res.status(200).json({
      success: true,
      program,
    });
  } catch (error) {
    console.error("Get Program By Slug Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch program.",
      error: error.message,
    });
  }
};

/* =========================
   UPDATE PROGRAM
========================= */

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    const {
      title,
      category,
      shortDescription,
      description,
      isActive,
      order,
    } = req.body;

    if (title !== undefined) {
      program.title = title;
      program.slug = createSlug(title);
    }

    if (category !== undefined) {
      program.category = category;
    }

    if (shortDescription !== undefined) {
      program.shortDescription = shortDescription;
    }

    if (description !== undefined) {
      program.description = description;
    }

    if (isActive !== undefined) {
      program.isActive =
        isActive === "true" || isActive === true;
    }

    if (order !== undefined) {
      program.order = Number(order) || 0;
    }

    if (req.file) {
      if (program.image && program.image.fileId) {
        try {
          await bucket().delete(
            new mongoose.Types.ObjectId(program.image.fileId)
          );
        } catch (deleteError) {
          console.log(
            "Old program image delete skipped:",
            deleteError.message
          );
        }
      }

      program.image = {
        fileId: req.file.id,
        filename: req.file.filename,
      };
    }

    await program.save();

    res.status(200).json({
      success: true,
      message: "Program updated successfully.",
      program,
    });
  } catch (error) {
    console.error("Update Program Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update program.",
      error: error.message,
    });
  }
};

/* =========================
   DELETE PROGRAM
========================= */

const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    if (program.image && program.image.fileId) {
      try {
        await bucket().delete(
          new mongoose.Types.ObjectId(program.image.fileId)
        );
      } catch (deleteError) {
        console.log(
          "Program image delete skipped:",
          deleteError.message
        );
      }
    }

    await Program.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Program deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Program Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete program.",
      error: error.message,
    });
  }
};

/* =========================
   GET PROGRAM IMAGE
========================= */

const getProgramImage = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.fileId);

    const files = await mongoose.connection.db
      .collection("programImages.files")
      .find({
        _id: fileId,
      })
      .toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Program image not found.",
      });
    }

    const file = files[0];

    res.set("Content-Type", file.contentType || "image/jpeg");

    const downloadStream = bucket().openDownloadStream(fileId);

    downloadStream.on("error", (error) => {
      console.error("Program Image Stream Error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: "Failed to load program image.",
        });
      }
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("Get Program Image Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load program image.",
      error: error.message,
    });
  }
};

module.exports = {
  createProgram,
  getPrograms,
  getProgramBySlug,
  updateProgram,
  deleteProgram,
  getProgramImage,
};