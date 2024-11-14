const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../server');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mockingoose = require('mockingoose');
const Article = require('../api/articles/articles.schema');
const User = require('../api/users/users.model');
const articlesService = require('../api/articles/articles.service');

// Supertest permet de tester les routes HTTP
// Mockingoose est utilisé pour simuler Mongoose dans les tests

describe('Articles API', () => {
    let token;
    const USER_ID = 'fakeUserId';
    const MOCK_USER = {
        _id: USER_ID,
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'hashedpassword',
        role: 'admin',
    };
    const MOCK_ARTICLE = {
        _id: mongoose.Types.ObjectId(),
        title: 'Nouvel Article',
        content: 'Ceci est un nouvel article.',
        user: USER_ID,
    };
    const UPDATED_ARTICLE = {
        title: 'Titre Modifié',
    };

    beforeEach(() => {
        token = jwt.sign({ userId: USER_ID, role: 'admin' }, config.secretJwtToken);
        mockingoose.resetAll();
        mockingoose(User).toReturn(MOCK_USER, 'findOne');
    });

    // Test de création d'un article
    it('devrait créer un article', async () => {
        mockingoose(Article).toReturn(MOCK_ARTICLE, 'save');

        const response = await request(app)
            .post('/api/articles')
            .send(MOCK_ARTICLE)
            .set('x-access-token', token);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(MOCK_ARTICLE.title);
    });

    // Test de mise à jour d'un article
    it('devrait mettre à jour un article', async () => {
        mockingoose(Article).toReturn({ ...MOCK_ARTICLE, ...UPDATED_ARTICLE }, 'findOneAndUpdate');

        const response = await request(app)
            .put(`/api/articles/${MOCK_ARTICLE._id}`)
            .send(UPDATED_ARTICLE)
            .set('x-access-token', token);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(UPDATED_ARTICLE.title);
    });

    // Test de suppression d'un article
    it('devrait supprimer un article', async () => {
        mockingoose(Article).toReturn(MOCK_ARTICLE, 'findOneAndDelete');

        const response = await request(app)
            .delete(`/api/articles/${MOCK_ARTICLE._id}`)
            .set('x-access-token', token);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Article supprimé avec succès.');
    });

    // Vérifier que le service a bien été appelé
    it('devrait appeler articlesService.createArticle', async () => {
        const spy = jest.spyOn(articlesService, 'createArticle').mockImplementation(() => MOCK_ARTICLE);
        await request(app).post('/api/articles').send(MOCK_ARTICLE).set('x-access-token', token);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        jest.restoreAllMocks();
    });
});
