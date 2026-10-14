
const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      filename: {
        type: String,
        default: "",
      },
    },

    // Event / announcement information
    title: {
      type: String,
      trim: true,
      default: "",
      maxlength: 120,
    },

    shortDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: 200,
    },

    fullDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: 10000,
    },

    category: {
      type: String,
      trim: true,
      enum: [
        "Event",
        "Challenge",
        "Announcement",
        "News",
        "Other",
      ],
      default: "Announcement",
    },

    buttonText: {
      type: String,
      trim: true,
      default: "Learn More",
      maxlength: 40,
    },

    registrationUrl: {
      type: String,
      trim: true,
      default: "",
      maxlength: 2048,
    },

    // Homepage popup controls
    showOnHomepage: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
