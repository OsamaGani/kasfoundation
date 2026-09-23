const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    coverImage: {
      fileId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },

      filename: {
        type: String,
        default: "",
      },
    },

    photos: [
      {
        fileId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },

        filename: {
          type: String,
          default: "",
        },
      },
    ],

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

module.exports = mongoose.model("Gallery", gallerySchema);