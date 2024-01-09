const {Banner} = require('./schema');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const getban = async (req, res) => {
    try {
      const banget = await Banner.find();
      res.json(banget);
    } catch (error) {
      console.error('Error fetching banner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

/*const postban = async (req, res) => {
  try {
    // Use Multer to handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err);
        return res.status(500).json({ error: 'Error uploading image.' });
      } else if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ error: 'Error uploading image.' });
      }

      const { text, expiryDate } = req.body;

      const parsedDate = Date.parse(expiryDate);
      parsedDate.setHours(0, 0, 0, 0);
      const isValidDate = !isNaN(parsedDate.getTime());

      if (!isValidDate) {
        return res.status(400).json({ error: 'Invalid date format for expiryDate.' });
      }

      const formattedExpiryDate = new Date(parsedDate);

      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided.' });
      }

      // Access the uploaded image data from the request
      const imageBuffer = req.file.buffer;

      const newBanner = new Banner({ image: imageBuffer, text, expiryDate: formattedExpiryDate });
      await newBanner.save();

      res.json({ message: 'Banner posted successfully.', newBanner });
    });
  } catch (error) {
    console.error('Error posting banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postban = async (req, res) => {
  try {
    // Use Multer to handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err);
        return res.status(500).json({ error: 'Error uploading image.' });
      } else if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ error: 'Error uploading image.' });
      }

      const { text, expiryDate, image } = req.body;

      // Parse the date and remove the time part
      const parsedDate = new Date(expiryDate);
      parsedDate.setHours(0, 0, 0, 0);
      const isValidDate = !isNaN(parsedDate.getTime());

      if (!isValidDate) {
        return res.status(400).json({ error: 'Invalid date format for expiryDate.' });
      }

      const formattedExpiryDate = parsedDate.toISOString();

      if (!image) {
        return res.status(400).json({ error: 'No image string provided.' });
      }

      // Convert the base64 image string to a buffer
      const imageBuffer = Buffer.from(image, 'base64');

      const newBanner = new Banner({ image: imageBuffer, text, expiryDate: formattedExpiryDate });
      await newBanner.save();

      res.json({ message: 'Banner posted successfully.', newBanner });
    });
  } catch (error) {
    console.error('Error posting banner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postban = async (req, res) => {
  try {
    const { text, expiryDate, image } = req.body;

    const parsedTimestamp = Date.parse(expiryDate);
    const parsedDate = new Date(parsedTimestamp);
    parsedDate.setHours(0, 0, 0, 0);

    const isValidDate = !isNaN(parsedDate.getTime());

    if (!isValidDate) {
      return res.status(400).json({ error: 'Invalid date format for expiryDate.' });
    }

    const formattedExpiryDate = new Date(parsedDate);

    if (!image) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const newBanner = new Banner({ image, text, expiryDate: formattedExpiryDate });
    await newBanner.save();

    res.json({ message: 'Banner posted successfully.', newBanner });
  } catch (error) {
    console.error('Error posting banner:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};*/

cloudinary.config({
  cloud_name: 'dbja3jqam',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const postban = async (req, res) => {
  try {
    const { text, expiryDate } = req.body;

    const parsedTimestamp = Date.parse(expiryDate);
    const parsedDate = new Date(parsedTimestamp);
    parsedDate.setHours(0, 0, 0, 0);

    const isValidDate = !isNaN(parsedDate.getTime());

    if (!isValidDate) {
      return res.status(400).json({ error: 'Invalid date format for expiryDate.' });
    }

    const formattedExpiryDate = new Date(parsedDate);

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const cloudinaryUploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });

    console.log('Cloudinary Upload Result:', cloudinaryUploadResult);

    const newBanner = new Banner({
      text,
      expiryDate: formattedExpiryDate,
      cloudinaryPublicId: cloudinaryUploadResult.public_id,
      cloudinaryUrl: cloudinaryUploadResult.secure_url,
    });

    await newBanner.save();

    res.json({ message: 'Banner posted successfully.', newBanner });
  } catch (error) {
    console.error('Error posting banner:', error);
    res.status(500).json({ error: 'internal server error', details: error });
  }
};

const updatexp = async (req, res) => {
    try {
      const bannerId = req.params.id;
      const { newExpiryDate } = req.body;
      
      const parsedDate = Date.parse(newExpiryDate);
      parsedDate.setHours(0, 0, 0, 0);

      /*const isValidDate = !isNaN(parsedDate);

      if (!isValidDate) {
        return res.status(400).json({ error: 'Invalid date format for newExpiryDate.' });
      }

      const formattedExpiryDate = new Date(parsedDate);*/

      const updatedBanner = await Banner.findByIdAndUpdate(
        bannerId,
        { expiryDate: newExpiryDate },
        { new: true }
      );

      if (!updatedBanner) {
        return res.status(404).json({ error: 'Banner not found.' });
      }

      res.json({ message: 'Banner expiry date updated successfully.', banner: updatedBanner });
    } catch (error) {
      console.error('Error updating banner expiry date:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const deleteban = async (req, res) => {
  try {
    const bannerId = req.params.id;

    const bannerToDelete = await Banner.findById(bannerId);
    if (!bannerToDelete) {
      return res.status(404).json({ error: 'Banner not found.' });
    }

    const del = await Banner.findByIdAndDelete(bannerId);
    res.status(200).json({ success: 'banner deleted successfully', del });
  } catch (error) {
    console.error (error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {getban, postban, updatexp, deleteban};