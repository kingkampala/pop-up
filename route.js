const express = require('express');
const {getban, postban, updatexp, deleteban} = require('./controller');
const router = express.Router();
const multerUpload = require('./multer');


router.get('/', getban);

router.post('/', multerUpload.single('image'), postban);

router.put('/:id', updatexp);

router.delete('/:id', deleteban);


module.exports = router;