const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
     return db.query(`SELECT  author, title,article_id, body,topic,created_at,votes,article_img_url 
                      FROM articles WHERE article_id =$1 `,[article_id])
    .then(({ rows }) => {
       
        if (!rows.length){
            return Promise.reject({status:404 , msg: 'Not Found'})
        }
      
      return rows[0];
    });
    };

exports.selectArticles = (sort_by) => {

  const sortByArr = ["created_at"];

  let sqlQuery = `SELECT  articles.*,
                  COUNT(comment_id) AS comment_count
                        FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
                  GROUP BY articles.article_id `; 

  if (sort_by && !sortByArr.includes(sort_by)){
                    return Promise.reject({status:400 , msg: 'Bad Request'})
               }

  if (sort_by && sortByArr.includes(sort_by)){
                       sqlQuery += ` ORDER BY articles.${sort_by} desc`
                    }
     
    return db.query(sqlQuery)           
             .then(({ rows }) => {
              if (!rows.length){
                  return Promise.reject({status:404 , msg: 'Not Found'})
                 }
             return {rows};
             });
     };

    