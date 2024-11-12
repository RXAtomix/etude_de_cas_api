const express = require('express');
const ArticlesController = require('./articles.controller');
const authMiddleware = require('../../middlewares/auth');

const router = express.Router();

// Route pour cr�er un article (n�cessite une authentification)
router.post('/', authMiddleware, ArticlesController.createArticle);

// Route pour mettre � jour un article sp�cifique (n�cessite une authentification)
router.put('/:id', authMiddleware, ArticlesController.updateArticle);

// Route pour supprimer un article sp�cifique (n�cessite une authentification)
router.delete('/:id', authMiddleware, ArticlesController.deleteArticle);

module.exports = router;