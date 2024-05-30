const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
     return db.query(`SELECT  * 
                      FROM comments WHERE article_id =$1 
                      ORDER BY created_at desc`,[article_id])
    .then(({ rows }) => {
    
      return {rows};
    });
    };
