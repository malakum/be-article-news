const db = require("../db/connection");
const format = require("pg-format");

exports.checkArticleById =(article_id) =>{ 
      return db.query(`SELECT article_id,author FROM articles WHERE article_id =$1`,[article_id])
              .then (({rows}) =>{ 
              
                if (!rows.length){
                  return Promise.reject({status:404 , msg: 'Not Found'})
              }
              return rows})};

exports.selectArticleById = (article_id) => {
     return db.query(`SELECT  a.author, a.title, a.article_id, a.body, a.topic, a.created_at, a.votes, a.article_img_url ,count(b.comment_id) AS comment_count
                      FROM articles a LEFT JOIN comments b
                      ON a.article_id = b.article_id
                      WHERE a.article_id =$1 
                      GROUP BY  a.article_id `,[article_id])             
    .then(({ rows }) => {
        if (!rows.length){
            return Promise.reject({status:404 , msg: 'Not Found'})
        }
      
      return rows[0];
    });
    };

exports.selectArticles = (topic,sort_by) => {

  const sortByArr = ["created_at","votes","comment_count"];
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
    if (sort_by==="comment_count"){
      //  sqlQuery += ` ORDER BY ${sort_by} desc`
      sqlQuery += ` ORDER BY comment_count desc`
    }
    else{ sqlQuery += ` ORDER BY articles.${sort_by} desc`}  
                    }
     
    return db.query(sqlQuery,queryValue)           
             .then(({ rows }) => {
  
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
      
       if (typeof inc_votes !='number'){
        return Promise.reject({status:400 , msg: 'Bad Request'})
       }
     
       const updateData = format(`UPDATE articles SET votes = votes+ ${inc_votes}
                           WHERE article_id = ${article_id} RETURNING*;`);

                     
          return db.query(updateData)
        .then(({ rows }) => {
         return rows[0];
     });
    
      });
    };