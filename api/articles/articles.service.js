const Article = require('./articles.schema');

class ArticleService {
    // Création d'un article
    async createArticle(articleData, userId) {
        try {
            const newArticle = new Article({
                ...articleData,
                user: userId,
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

    async getArticlesByUser(userId) {
        try {
            return await Article.find({ user: userId }).populate('user', '-password');
        } catch (error) {
            throw new Error('Erreur lors de la récupération des articles : ' + error.message);
        }
    }
}

module.exports = new ArticleService();
