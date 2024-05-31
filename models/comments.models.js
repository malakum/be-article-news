const db = require("../db/connection");
const format = require("pg-format");

exports.selectCommentsByArticleId = (article_id) => {
     return db.query(`SELECT  * 
                      FROM comments WHERE article_id =$1 
                      ORDER BY created_at desc`,[article_id])
    .then(({ rows }) => {
    
      return {rows};
    });
          };


  exports.createCommentsByArticleId = (article_id,newComment) => {
    
    
    return db.query(`SELECT  author,article_id 
                      FROM articles WHERE article_id =$1 `,[article_id])
    .then(({ rows }) => {
       
        if (!rows.length){
            return Promise.reject({status:404 , msg: 'Not Found'})
        }
        const { author, body} = newComment;
        if (!author || !body){
          return Promise.reject({status:400 , msg :'Bad Request'});
        };

        const inputDate = new Date;
        const newCommentArr = [];
        newCommentArr.push(author,body,article_id,0,inputDate,);

     const commentInsertQuery = format(`INSERT INTO comments(
                                        author,body,article_id,votes,created_at)
                                        VALUES %L RETURNING*`,[newCommentArr]);

     return db.query(commentInsertQuery)
       .then(({ rows }) => {
 
      return rows[0];
      }).catch((error )=>{return Promise.reject({status:404 , msg :'Not Found'})});
     
    });
   
     };
     exports.deleteCommentRow = (comment_id) => {
      return db.query(`DELETE FROM comments WHERE comment_id =$1 RETURNING *`,[comment_id] )
                     
     .then(({ rows }) => {
      
       return {rows};
     });
     
     };   
     

