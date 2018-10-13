const express = require("express");
const router = express.Router();

const publicController = require('../controllers/public.js')

router.post('/evaluate', publicController.score_evaluate);
router.post('/evaluateSave', publicController.score_evaluate_save);
router.post('/evaluateInitial',publicController.get_initial_evaluate_state);

module.exports = router;