import mongoose from "mongoose";

//create a schema for comments
const commentSchema = new mongoose.Schema({
  //create a comment field
  name: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0, // Ensure positive rating
    max: 5,
    default: 0,
  },
  comment: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
});

//create model for comments

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
