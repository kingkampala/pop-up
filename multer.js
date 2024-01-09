const multer = require('multer');
const path = require('path');
const updir = 'uploads';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, updir))
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

module.exports = upload;