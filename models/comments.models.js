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
        
         const newCommentArr = [];
         newCommentArr.push(author,body,article_id,0,'30-may-2024',);

      const commentInsertQuery = format(`INSERT INTO comments(
                                         author,body,article_id,votes,created_at)
                                         VALUES %L RETURNING*`,[newCommentArr]);

      return db.query(commentInsertQuery)
        .then(({ rows }) => {
  
       return rows[0];
     });
     };
     

