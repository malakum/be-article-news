const db = require("../db/connection");
const format = require("pg-format");

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

exports.selectArticles = (topic,sort_by) => {

  const sortByArr = ["created_at"];
  const queryValue =[];

  let sqlQuery = `SELECT  articles.*,
                  COUNT(comment_id) AS comment_count
                        FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id
                  `; 
  if (topic){
    sqlQuery += ' WHERE topic = $1';
    queryValue.push(topic);
  }
  sqlQuery += ' GROUP BY articles.article_id';

  if (sort_by && !sortByArr.includes(sort_by)){
                    return Promise.reject({status:400 , msg: 'Bad Request'})
               }

  if (sort_by && sortByArr.includes(sort_by)){
                       sqlQuery += ` ORDER BY articles.${sort_by} desc`
                    }
     
    return db.query(sqlQuery,queryValue)           
             .then(({ rows }) => {
              if (!rows.length){
                  return Promise.reject({status:404 , msg: 'Not Found'})
                 }
             return {rows};
             });
     };

exports.updateArticleByArticleId =(article_id, inc_votes)=>{
     
      return db.query(`SELECT votes FROM articles WHERE article_id =$1`,[article_id])
      .then (({rows})=> {
        if (!rows.length){
          return Promise.reject({status:404 , msg: 'Not Found'})
      }
    
       const {votes} = rows[0];
     
       const actualVotes = votes+inc_votes;
    
       const updateData = format(`UPDATE articles SET votes = ${actualVotes}
                           WHERE article_id = ${article_id} RETURNING*;`, [actualVotes, article_id]);

                     

      return db.query(updateData)
        .then(({ rows }) => {
         return rows[0];
     });
    
      });
    };