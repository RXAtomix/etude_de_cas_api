const Article = require('./articles.schema');

class ArticleService {
    // Création d'un article
    async createArticle(articleData, userId) {
        try {
            const newArticle = new Article({
                ...articleData,
                author: userId,
                createdAt: Date.now()
            });
            return await newArticle.save();
        } catch (error) {
            throw new Error('Erreur lors de la création de l\'article: ' + error.message);
        }
    }

    // Mise à jour d'un article
    async updateArticle(articleId, updatedData) {
        try {
            return await Article.findByIdAndUpdate(articleId, updatedData, { new: true });
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de l\'article: ' + error.message);
        }
    }

    // Suppression d'un article
    async deleteArticle(articleId) {
        try {
            return await Article.findByIdAndDelete(articleId);
        } catch (error) {
            throw new Error('Erreur lors de la suppression de l\'article: ' + error.message);
        }
    }
}

module.exports = new ArticleService();
