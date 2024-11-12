const ArticleService = require('./articles.service');

class ArticlesController {
    // Contrôleur pour la création d'un article
    async createArticle(req, res) {
        try {
            const userId = req.user.id; // Récupération de l'id de l'utilisateur connecté
            const newArticle = await ArticleService.createArticle(req.body, userId);
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Contrôleur pour la mise à jour d'un article
    async updateArticle(req, res) {
        try {
            const updatedArticle = await ArticleService.updateArticle(req.params.id, req.body);
            res.status(200).json(updatedArticle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Contrôleur pour la suppression d'un article
    async deleteArticle(req, res) {
        try {
            await ArticleService.deleteArticle(req.params.id);
            res.status(200).json({ message: 'Article supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ArticlesController();
