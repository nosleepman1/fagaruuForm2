const express = require('express');
const router = express.Router();
const responseController = require('../controllers/ResponseController');
const { validateSubmitResponse } = require('../validations/responseValidation');

// POST - Soumettre un questionnaire
router.post('/', validateSubmitResponse, responseController.submitResponse);

// GET - Statistiques globales
router.get('/stats', responseController.getStats);

// GET - Toutes les réponses (pagination)
router.get('/', responseController.getResponses);

// GET - Une réponse par ID
router.get('/:id', responseController.getResponseById);

module.exports = router;