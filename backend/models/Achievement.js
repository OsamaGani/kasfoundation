const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    sectionLabel: {
      type: String,
      default: "ACHIEVEMENT",
      trim: true,
    },

    sectionTitle: {
      type: String,
      default: "",
      trim: true,
    },

    sectionDescription: {
      type: String,
      default: "",
      trim: true,
    },

    achievementType: {
      type: String,
      enum: [
        "Tournament Winner",
        "Runner Up",
        "Third Place",
        "Best Player",
        "Top Scorer",
        "Best Goalkeeper",
        "Player Selection",
        "Team Achievement",
        "Special Recognition",
        "Other",
      ],
      default: "Team Achievement",
    },

    level: {
      type: String,
      enum: [
        "Local",
        "City",
        "District",
        "State",
        "National",
        "International",
      ],
      default: "Local",
    },

    competition: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
      trim: true,
    },

    result: {
      type: String,
      default: "",
      trim: true,
    },

    participantType: {
      type: String,
      enum: ["Team", "Player"],
      default: "Team",
    },

    playerName: {
      type: String,
      default: "",
      trim: true,
    },

    teamName: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    district: {
      type: String,
      default: "",
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      default: "India",
      trim: true,
    },

    opponent: {
      type: String,
      default: "",
      trim: true,
    },

    opponentCountry: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },

      filename: {
        type: String,
        default: "",
      },
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Achievement",
  achievementSchema
);