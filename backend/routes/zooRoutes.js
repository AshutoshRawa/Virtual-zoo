const express = require('express');
const router = express.Router();
const { getZoos, getNearestZoo } = require('../controllers/zooController');

router.get('/', getZoos);
router.get('/nearest', getNearestZoo);

module.exports = router;
