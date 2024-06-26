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
        const { author, body} = newComment;
        const inputDate = new Date;
        const newCommentArr = [];
        newCommentArr.push(author,body,article_id,0,inputDate,);

     const commentInsertQuery = format(`INSERT INTO comments(
                                        author,body,article_id,votes,created_at)
                                        VALUES %L RETURNING*`,[newCommentArr]);

     return db.query(commentInsertQuery)
       .then(({ rows }) => {
     
      return rows[0];
      })
    
     };


     exports.deleteCommentRow = (comment_id) => {
      return db.query(`DELETE FROM comments WHERE comment_id =$1 RETURNING *`,[comment_id] )
                     
     .then(({ rows }) => {
      
       return {rows};
     });
     
     };   
     

