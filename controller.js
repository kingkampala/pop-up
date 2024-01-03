const {Banner} = require('./schema');
const multer = require('multer');

const getban = async (req, res) => {
    try {
      const banget = await Banner.find();
      res.json(banget);
    } catch (error) {
      console.error('Error fetching banner:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const storage = multer.memoryStorage(); // Store files in memory (you can configure it to save to disk)
const upload = multer({ storage: storage }).single('image');

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
};*/

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

const updatexp = async (req, res) => {
    try {
      const bannerId = req.params.id;
      const { newExpiryDate } = req.body;

      /*const parsedDate = Date.parse(newExpiryDate);
      const isValidDate = !isNaN(parsedDate);

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