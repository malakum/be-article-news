const { selectArticleById , selectArticles, updateArticleByArticleId } = require("../models/articles.models")

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

exports.patchArticleByArticleId = (req, res, next) => {
  const {article_id} = req.params;
  const { inc_votes } = req.body;
  
updateArticleByArticleId( article_id, inc_votes).then((article) => {  
   res.status(200).send({article});
  }).catch(next);
};