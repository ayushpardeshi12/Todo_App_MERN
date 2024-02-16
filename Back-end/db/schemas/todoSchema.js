const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // We will add this field in our database.
      updatedAt: "updated_at", // We will add this field in our database
    },
  }
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
