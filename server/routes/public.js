const express = require("express");
const router = express.Router();

const publicController = require('../controllers/public.js')

router.post('/change', publicController.change_password);

router.post('/evaluate', publicController.score_evaluate);
router.post('/evaluateSave', publicController.score_evaluate_save);
router.post('/evaluateInitial', publicController.get_initial_evaluate_state);
router.post('/evaluateStandInitial', publicController.get_initial_evaluate_stand);

module.exports = router;