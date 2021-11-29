const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
    minlength: 1,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
    minlength: 1,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
  },
  role: {
    type: String,
    required: true,
    minlength: 1,
  },
  joined: {
    type: Date,
    required: false,
  },
  work: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = {
  model: mongoose.model("User", schema),
  schema,
};
