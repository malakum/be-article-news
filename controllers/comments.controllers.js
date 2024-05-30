const { selectArticleById } = require("../models/articles.models");
const { selectCommentsByArticleId } = require("../models/comments.models")

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