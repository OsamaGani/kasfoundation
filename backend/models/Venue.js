const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      default: "VENUES",
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
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
  "Venue",
  venueSchema
);