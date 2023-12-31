const express = require('express');
const {getban, postban, updatexp, deleteban} = require('./controller');
const router = express.Router();


router.get('/', getban);

router.post('/', postban);

router.put('/:id', updatexp);

router.delete('/:id', deleteban);


module.exports = router;