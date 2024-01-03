const mongoose = require('mongoose');

/*const popUpContentSchema = new mongoose.Schema({
  title: String,
  description: String,
});*/

const bannerSchema = new mongoose.Schema({
  image: String/*Buffer*/,
  text: String,
  expiryDate: String/*Date*/,
});

//const PopUpContent = mongoose.model('PopUpContent', popUpContentSchema);
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = {Banner};