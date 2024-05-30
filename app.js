const express = require("express");

const app = express();

const { getTopics } = require("./controllers/topics.controllers.js");

const { getAllApi }= require("./controllers/allApi.controllers.js");

const { getArticleById, getArticles,} = require("./controllers/articles.controllers.js");

const { getCommentsByArticleId } = require("./controllers/comments.controllers.js");


app.use(express.json());


app.get('/api/topics', getTopics);

app.get('/api', getAllApi);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad Request' });
    } 
    else {
        next(err);
    }
   });

  app.use((err, req, res, next) => {
  
    if (err.status && err.msg) {
    
        res.status(err.status).send({ msg: err.msg });
    }
   
    });
app.use((err, req, res, next) => {
 
    res.status(500).send('Server Error!');
  });


module.exports = app;