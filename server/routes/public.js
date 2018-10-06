const express = require("express");
const router = express.Router();

const publicController = require('../controllers/public.js')

router.post('/evaluate', publicController.score_evaluate);

module.exports = router;