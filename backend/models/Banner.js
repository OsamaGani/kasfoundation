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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);