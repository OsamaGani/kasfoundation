const mongoose = require("mongoose");

const Achievement = require("../models/Achievement");

const BUCKET_NAME = "achievementImages";

const getBucket = () => {
  if (!mongoose.connection.db) {
    throw new Error(
      "MongoDB database connection is not ready."
    );
  }

  return new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    {
      bucketName: BUCKET_NAME,
    }
  );
};

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

const createAchievement = async (req, res) => {
  try {
    const {
      title,
      sectionLabel,
      sectionTitle,
      sectionDescription,
      achievementType,
      level,
      competition,
      year,
      result,
      participantType,
      playerName,
      teamName,
      description,
      city,
      district,
      state,
      country,
      opponent,
      opponentCountry,
      isFeatured,
      isActive,
      order,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Achievement title is required.",
      });
    }

    const achievement = await Achievement.create({
      title: title.trim(),

      sectionLabel:
        sectionLabel?.trim() ||
        "ACHIEVEMENT",

      sectionTitle:
        sectionTitle?.trim() || "",

      sectionDescription:
        sectionDescription?.trim() || "",

      achievementType:
        achievementType ||
        "Team Achievement",

      level:
        level ||
        "Local",

      competition:
        competition?.trim() || "",

      year:
        year?.trim() || "",

      result:
        result?.trim() || "",

      participantType:
        participantType ||
        "Team",

      playerName:
        playerName?.trim() || "",

      teamName:
        teamName?.trim() || "",

      description:
        description?.trim() || "",

      city:
        city?.trim() || "",

      district:
        district?.trim() || "",

      state:
        state?.trim() || "",

      country:
        country?.trim() || "India",

      opponent:
        opponent?.trim() || "",

      opponentCountry:
        opponentCountry?.trim() || "",

      image: req.file
        ? {
            fileId: req.file.id,
            filename: req.file.filename,
          }
        : {
            fileId: null,
            filename: "",
          },

      isFeatured:
        isFeatured === true ||
        isFeatured === "true",

      isActive:
        isActive !== false &&
        isActive !== "false",

      order:
        Number(order) || 0,
    });

    return res.status(201).json({
      success: true,
      message:
        "Achievement added successfully.",
      achievement,
    });
  } catch (error) {
    console.error(
      "Create achievement error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to create achievement.",
    });
  }
};

const getAchievements = async (req, res) => {
  try {
    const isAdmin =
      req.query.admin === "true";

    const filter = isAdmin
      ? {}
      : {
          isActive: true,
        };

    const achievements =
      await Achievement.find(filter).sort({
        order: 1,
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: achievements.length,
      achievements,
    });
  } catch (error) {
    console.error(
      "Get achievements error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch achievements.",
    });
  }
};

const getAchievementById = async (
  req,
  res
) => {
  try {
    const achievement =
      await Achievement.findById(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message:
          "Achievement not found.",
      });
    }

    return res.status(200).json({
      success: true,
      achievement,
    });
  } catch (error) {
    console.error(
      "Get achievement error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch achievement.",
    });
  }
};

const updateAchievement = async (
  req,
  res
) => {
  try {
    const achievement =
      await Achievement.findById(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message:
          "Achievement not found.",
      });
    }

    if (req.body.title !== undefined) {
      achievement.title =
        req.body.title.trim();
    }

    if (
      req.body.sectionLabel !==
      undefined
    ) {
      achievement.sectionLabel =
        req.body.sectionLabel.trim();
    }

    if (
      req.body.sectionTitle !==
      undefined
    ) {
      achievement.sectionTitle =
        req.body.sectionTitle.trim();
    }

    if (
      req.body.sectionDescription !==
      undefined
    ) {
      achievement.sectionDescription =
        req.body.sectionDescription.trim();
    }

    if (
      req.body.achievementType !==
      undefined
    ) {
      achievement.achievementType =
        req.body.achievementType;
    }

    if (req.body.level !== undefined) {
      achievement.level =
        req.body.level;
    }

    if (
      req.body.competition !==
      undefined
    ) {
      achievement.competition =
        req.body.competition.trim();
    }

    if (req.body.year !== undefined) {
      achievement.year =
        req.body.year.trim();
    }

    if (req.body.result !== undefined) {
      achievement.result =
        req.body.result.trim();
    }

    if (
      req.body.participantType !==
      undefined
    ) {
      achievement.participantType =
        req.body.participantType;
    }

    if (
      req.body.playerName !==
      undefined
    ) {
      achievement.playerName =
        req.body.playerName.trim();
    }

    if (
      req.body.teamName !==
      undefined
    ) {
      achievement.teamName =
        req.body.teamName.trim();
    }

    if (
      req.body.description !==
      undefined
    ) {
      achievement.description =
        req.body.description.trim();
    }

    if (req.body.city !== undefined) {
      achievement.city =
        req.body.city.trim();
    }

    if (
      req.body.district !==
      undefined
    ) {
      achievement.district =
        req.body.district.trim();
    }

    if (req.body.state !== undefined) {
      achievement.state =
        req.body.state.trim();
    }

    if (
      req.body.country !==
      undefined
    ) {
      achievement.country =
        req.body.country.trim();
    }

    if (
      req.body.opponent !==
      undefined
    ) {
      achievement.opponent =
        req.body.opponent.trim();
    }

    if (
      req.body.opponentCountry !==
      undefined
    ) {
      achievement.opponentCountry =
        req.body.opponentCountry.trim();
    }

    if (
      req.body.isFeatured !==
      undefined
    ) {
      achievement.isFeatured =
        req.body.isFeatured === true ||
        req.body.isFeatured === "true";
    }

    if (
      req.body.isActive !==
      undefined
    ) {
      achievement.isActive =
        req.body.isActive !== false &&
        req.body.isActive !== "false";
    }

    if (req.body.order !== undefined) {
      achievement.order =
        Number(req.body.order) || 0;
    }

    if (req.file) {
      const oldFileId =
        achievement.image?.fileId;

      achievement.image = {
        fileId: req.file.id,
        filename: req.file.filename,
      };

      if (oldFileId) {
        await deleteGridFSFile(
          oldFileId
        );
      }
    }

    await achievement.save();

    return res.status(200).json({
      success: true,
      message:
        "Achievement updated successfully.",
      achievement,
    });
  } catch (error) {
    console.error(
      "Update achievement error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update achievement.",
    });
  }
};

const deleteAchievement = async (
  req,
  res
) => {
  try {
    const achievement =
      await Achievement.findById(
        req.params.id
      );

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message:
          "Achievement not found.",
      });
    }

    if (achievement.image?.fileId) {
      await deleteGridFSFile(
        achievement.image.fileId
      );
    }

    await Achievement.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      message:
        "Achievement deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete achievement error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete achievement.",
    });
  }
};

const getAchievementImage = async (
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

    const bucket = getBucket();

    const fileId =
      new mongoose.Types.ObjectId(
        req.params.fileId
      );

    const files =
      await bucket
        .find({
          _id: fileId,
        })
        .toArray();

    if (!files.length) {
      return res.status(404).json({
        success: false,
        message:
          "Achievement image not found.",
      });
    }

    const file = files[0];

    res.set(
      "Content-Type",
      file.metadata?.contentType ||
        "application/octet-stream"
    );

    res.set(
      "Cache-Control",
      "public, max-age=31536000"
    );

    const downloadStream =
      bucket.openDownloadStream(fileId);

    downloadStream.on(
      "error",
      (error) => {
        console.error(
          "GridFS image stream error:",
          error
        );

        if (!res.headersSent) {
          res.status(500).end();
        }
      }
    );

    downloadStream.pipe(res);
  } catch (error) {
    console.error(
      "Get achievement image error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load achievement image.",
    });
  }
};

module.exports = {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
  getAchievementImage,
};