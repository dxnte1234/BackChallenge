const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {timestamps: true,
  }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;