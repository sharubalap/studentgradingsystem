const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  marks: {
    type: Number,
    default: 0,
  },
  grade: {
    type: String,
    default: 'N/A',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
