const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const ArticleService = require('./articles.service');

class ArticlesController {
    // Contrôleur pour la création d'un article
    async createArticle(req, res) {
        try {
            const userId = req.user.id; // Récupération de l'id de l'utilisateur connecté
            const newArticle = await ArticleService.createArticle({ ...req.body, author: userId }, userId);
            req.io.emit('articleCreated', newArticle); // Émettre un événement de création d'article
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Contrôleur pour la mise à jour d'un article
    async updateArticle(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Accès refusé. Seul un administrateur peut modifier un article.' });
            }
            const updatedArticle = await ArticleService.updateArticle(req.params.id, req.body);
            res.status(200).json(updatedArticle);
            req.io.emit('articleUpdated', updatedArticle); // Émettre un événement de mise à jour d'article
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Contrôleur pour la suppression d'un article
    async deleteArticle(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Accès refusé. Seul un administrateur peut supprimer un article.' });
            }
            await ArticleService.deleteArticle(req.params.id);
            req.io.emit('articleDeleted', { id: req.params.id }); // Émettre un événement de suppression d'article
            res.status(200).json({ message: 'Article supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ArticlesController();
