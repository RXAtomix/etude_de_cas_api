const mongoose = require("mongoose");
const assert = require("assert");
const Article = require("../api/articles/articles.schema.js");

describe("Article Model Test", () => {
    beforeEach((done) => {
        mongoose.connect("mongodb://localhost/testDB", { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", () => {
            console.log("We are connected to test database!");
            done();
        });
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
        });
    });

    it("should create an article with default status as draft", (done) => {
        const article = new Article({
            title: "Test Article",
            content: "This is a test article.",
            user: new mongoose.Types.ObjectId(),
        });

        article.save()
            .then((savedArticle) => {
                assert.strictEqual(savedArticle.status, "draft");
                done();
            })
            .catch((err) => done(err));
    });

    it("should create an article with status as published", (done) => {
        const article = new Article({
            title: "Test Article 2",
            content: "This is another test article.",
            user: new mongoose.Types.ObjectId(),
            status: "published",
        });

        article.save()
            .then((savedArticle) => {
                assert.strictEqual(savedArticle.status, "published");
                done();
            })
            .catch((err) => done(err));
    });

    it("should not allow invalid status", (done) => {
        const article = new Article({
            title: "Invalid Status Article",
            content: "This article has an invalid status.",
            user: new mongoose.Types.ObjectId(),
            status: "invalid_status",
        });

        article.save()
            .catch((err) => {
                assert.ok(err.errors.status);
                done();
            });
    });
});
