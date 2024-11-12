const express = require('express');
const ArticlesController = require('./articles.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// Route pour créer un article (nécessite une authentification)
router.post('/', authMiddleware, ArticlesController.createArticle);

// Route pour mettre à jour un article spécifique (nécessite une authentification)
router.put('/:id', authMiddleware, ArticlesController.updateArticle);

// Route pour supprimer un article spécifique (nécessite une authentification)
router.delete('/:id', authMiddleware, ArticlesController.deleteArticle);

module.exports = router;