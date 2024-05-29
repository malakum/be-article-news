const { selectArticleById , selectArticles } = require("../models/articles.models")

exports.getArticleById = (req, res, next) => {
      const {article_id} = req.params;
   
    selectArticleById(article_id).then((article) => {      
      res.status(200).send({article});
      }).catch(next);
};

exports.getArticles = (req, res, next) => {
  const {sort_by} = req.query;
  
selectArticles(sort_by).then((articles) => {  
   res.status(200).send({articles});
  }).catch(next);
};