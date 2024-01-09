const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  text: String,
  expiryDate: Date,
  cloudinaryPublicId: String,
  cloudinaryUrl: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = {Banner};