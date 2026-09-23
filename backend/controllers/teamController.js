const mongoose = require("mongoose");
const Team = require("../models/Team");


/* =========================================
   GRIDFS BUCKET
========================================= */

const getBucket = () => {
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error(
      "MongoDB database connection is not ready."
    );
  }

  return new mongoose.mongo.GridFSBucket(db, {
    bucketName: "teamImages",
  });
};


/* =========================================
   SLUG GENERATOR
========================================= */

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};


/* =========================================
   CREATE TEAM MEMBER
========================================= */

const createTeamMember = async (req, res) => {
  try {
    const {
      name,
      designation,
      shortDescription,
      description,
      isActive,
      order,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Team member name is required.",
      });
    }

    if (!designation || !designation.trim()) {
      return res.status(400).json({
        success: false,
        message: "Designation is required.",
      });
    }

    const slug = generateSlug(name);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid team member name.",
      });
    }

    const existingMember = await Team.findOne({
      slug,
    });

    if (existingMember) {
      return res.status(409).json({
        success: false,
        message:
          "A team member with this name already exists.",
      });
    }

    const profileImage =
      req.file || null;

    if (!profileImage) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required.",
      });
    }

    const teamMember = await Team.create({
      name: name.trim(),

      slug,

      designation:
        designation.trim(),

      shortDescription:
        shortDescription
          ? shortDescription.trim()
          : "",

      description:
        description
          ? description.trim()
          : "",

      profileImage: {
        fileId: profileImage.id,
        filename: profileImage.filename,
      },

      isActive:
        isActive === undefined
          ? true
          : String(isActive).toLowerCase() ===
            "true",

      order:
        order === undefined
          ? 0
          : Number(order) || 0,
    });

    return res.status(201).json({
      success: true,
      message:
        "Team member created successfully.",

      teamMember,
    });
  } catch (error) {
    console.error(
      "Create Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create team member.",

      error: error.message,
    });
  }
};


/* =========================================
   GET ALL TEAM MEMBERS
========================================= */

const getTeamMembers = async (req, res) => {
  try {
    const { admin } = req.query;

    let query = {};

    /*
      Public website:
      Only active members.

      Admin:
      All members using ?admin=true
    */

    if (admin !== "true") {
      query.isActive = true;
    }

    const teamMembers = await Team.find(
      query
    ).sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,

      count: teamMembers.length,

      team: teamMembers,
    });
  } catch (error) {
    console.error(
      "Get Team Members Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch team members.",

      error: error.message,
    });
  }
};


/* =========================================
   GET SINGLE TEAM MEMBER BY SLUG
========================================= */

const getTeamMemberBySlug = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const teamMember =
      await Team.findOne({
        slug,
        isActive: true,
      });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }

    return res.status(200).json({
      success: true,

      teamMember,
    });
  } catch (error) {
    console.error(
      "Get Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch team member.",

      error: error.message,
    });
  }
};


/* =========================================
   UPDATE TEAM MEMBER
========================================= */

const updateTeamMember = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      name,
      designation,
      shortDescription,
      description,
      isActive,
      order,
    } = req.body;

    const teamMember =
      await Team.findById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }


    /* ---------- NAME ---------- */

    if (name && name.trim()) {
      const newName = name.trim();

      const newSlug =
        generateSlug(newName);

      const duplicateMember =
        await Team.findOne({
          slug: newSlug,

          _id: {
            $ne: id,
          },
        });

      if (duplicateMember) {
        return res.status(409).json({
          success: false,
          message:
            "Another team member with this name already exists.",
        });
      }

      teamMember.name = newName;

      teamMember.slug = newSlug;
    }


    /* ---------- DESIGNATION ---------- */

    if (
      designation !== undefined &&
      designation.trim()
    ) {
      teamMember.designation =
        designation.trim();
    }


    /* ---------- SHORT DESCRIPTION ---------- */

    if (
      shortDescription !== undefined
    ) {
      teamMember.shortDescription =
        shortDescription.trim();
    }


    /* ---------- DESCRIPTION ---------- */

    if (
      description !== undefined
    ) {
      teamMember.description =
        description.trim();
    }


    /* ---------- STATUS ---------- */

    if (isActive !== undefined) {
      teamMember.isActive =
        String(isActive).toLowerCase() ===
        "true";
    }


    /* ---------- ORDER ---------- */

    if (order !== undefined) {
      teamMember.order =
        Number(order) || 0;
    }


    /* ---------- NEW PROFILE IMAGE ---------- */

    if (req.file) {
      const oldFileId =
        teamMember.profileImage?.fileId;

      teamMember.profileImage = {
        fileId: req.file.id,
        filename: req.file.filename,
      };

      if (oldFileId) {
        await deleteGridFSFile(
          oldFileId
        );
      }
    }


    await teamMember.save();

    return res.status(200).json({
      success: true,

      message:
        "Team member updated successfully.",

      teamMember,
    });
  } catch (error) {
    console.error(
      "Update Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update team member.",

      error: error.message,
    });
  }
};


/* =========================================
   DELETE TEAM MEMBER
========================================= */

const deleteTeamMember = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const teamMember =
      await Team.findById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found.",
      });
    }


    /* Delete profile image */

    if (
      teamMember.profileImage?.fileId
    ) {
      await deleteGridFSFile(
        teamMember.profileImage.fileId
      );
    }


    await Team.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,

      message:
        "Team member deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Team Member Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete team member.",

      error: error.message,
    });
  }
};


/* =========================================
   SERVE TEAM IMAGE
========================================= */

const getTeamImage = async (
  req,
  res
) => {
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

    const bucket = getBucket();

    const files =
      await bucket
        .find({
          _id:
            new mongoose.Types.ObjectId(
              fileId
            ),
        })
        .toArray();

    if (
      !files ||
      files.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const file = files[0];

    res.set(
      "Content-Type",
      file.contentType ||
        "image/jpeg"
    );

    res.set(
      "Content-Disposition",
      `inline; filename="${file.filename}"`
    );

    const downloadStream =
      bucket.openDownloadStream(
        new mongoose.Types.ObjectId(
          fileId
        )
      );

    downloadStream.on(
      "error",
      (error) => {
        console.error(
          "GridFS Download Error:",
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
      "Get Team Image Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load image.",

      error: error.message,
    });
  }
};


/* =========================================
   DELETE GRIDFS FILE
========================================= */

const deleteGridFSFile = async (
  fileId
) => {
  try {
    if (!fileId) {
      return;
    }

    const bucket = getBucket();

    await bucket.delete(
      new mongoose.Types.ObjectId(
        fileId
      )
    );
  } catch (error) {
    console.error(
      "GridFS File Delete Error:",
      error.message
    );
  }
};


/* =========================================
   EXPORTS
========================================= */

module.exports = {
  createTeamMember,
  getTeamMembers,
  getTeamMemberBySlug,
  updateTeamMember,
  deleteTeamMember,
  getTeamImage,
};