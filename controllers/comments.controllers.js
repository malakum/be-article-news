const {  checkArticleById } = require("../models/articles.models");
const { checkUserByAuthor} = require("../models/users.models");
const { selectCommentsByArticleId,  createCommentsByArticleId ,deleteCommentRow} = require("../models/comments.models")

exports.getCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    return checkArticleById(article_id).then((articleExist)=>{
    
         if (articleExist && articleExist.length >0) {
            return selectCommentsByArticleId(article_id).then((comments)=>{
                res.status(200).send({comments});
            })
            }
        else {
            return Promise.reject({ status: 404, msg: "Not Found" })
        }
         }).catch(next)
    };


exports.postCommentsByArticleId = (req, res, next) => {
    const {article_id} = req.params;
   
    const newComment = req.body;
    const { author, body} = newComment;
   
    if (!author || !body){
     
       res.status(400).send({msg :'Bad Request'});
             
      }
    else {
 
     checkArticleById(article_id).then((articleExist)=>{
    if (articleExist && articleExist.length >0) {
         checkUserByAuthor(author).then((authorExist)=>{
        
            if (authorExist && authorExist.length >0){
         
                createCommentsByArticleId(article_id,newComment).then((comment)=>{
               res.status(201).send({comment});
               }).catch(next);
            }
            else {
        
                return Promise.reject({ status: 404, msg: "Not Found" })  
            }
        }).catch(next);
    }
    else {
     
        return Promise.reject({ status: 404, msg: "Not Found" })
    }
     }).catch(next);
    }
};

exports.deleteCommentsByCommentId =(req,res,next) =>{
    const {comment_id} = req.params;
    deleteCommentRow(comment_id).then((comment) =>{
     
        res.status(204).send({comment});
    }).catch(next);
    }

