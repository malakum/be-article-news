const { selectArticleById } = require("../models/articles.models");
const { selectCommentsByArticleId,  createCommentsByArticleId ,deleteCommentRow} = require("../models/comments.models")

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
   

    createCommentsByArticleId(article_id,newComment).then((comment)=>{
        res.status(201).send({comment});
    }).catch(next);
    };

exports.getArticles = (req, res, next) => {
    const {sort_by} = req.query;
    
  selectArticles(sort_by).then((articles) => {  
     res.status(200).send({articles});
    }).catch(next);
  };
exports.deleteCommentsByCommentId =(req,res,next) =>{
    const {comment_id} = req.params;
    deleteCommentRow(comment_id).then((comment) =>{
     
        res.status(204).send({comment});
    }).catch(next);
    }

