const ArticleService = require('./articles.service');

class ArticlesController {
    // Contr�leur pour la cr�ation d'un article
    async createArticle(req, res) {
        try {
            const userId = req.user.id; // R�cup�ration de l'id de l'utilisateur connect�
            const newArticle = await ArticleService.createArticle(req.body, userId);
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Contr�leur pour la mise � jour d'un article
    async updateArticle(req, res) {
        try {
            const updatedArticle = await ArticleService.updateArticle(req.params.id, req.body);
            res.status(200).json(updatedArticle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Contr�leur pour la suppression d'un article
    async deleteArticle(req, res) {
        try {
            await ArticleService.deleteArticle(req.params.id);
            res.status(200).json({ message: 'Article supprim� avec succ�s.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ArticlesController();
