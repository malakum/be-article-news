const { selectArticleById } = require("../models/articles.models");
const { selectCommentsByArticleId,  createCommentsByArticleId } = require("../models/comments.models")

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const promises = [selectCommentsByArticleId(article_id)];

    if (article_id){
        promises.push(selectArticleById(article_id));
    }

    Promise.all(promises)
           .then ((resolvedPromises) =>{
            const comments =resolvedPromises[0];
            res.status(200).send({comments});
           }).catch(next);
  
};

exports.postCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const newComment = req.body;
   

     const promises = [createCommentsByArticleId(article_id,newComment)];

    if (article_id){
        promises.push(selectArticleById(article_id));
    }
   
    Promise.all(promises)
           .then ((resolvedPromises) =>{
            const comment =resolvedPromises[0];
            res.status(201).send({comment});
           }).catch(next);
  
};
