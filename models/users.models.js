const users = require("../db/data/test-data/users");
const db = require("../db/connection");
//const format = require("pg-format");


exports.checkUserByAuthor =(author)=>{
  return db.query(`SELECT * FROM users WHERE username =$1 `,[author])
  .then (({rows})=>{
    if (!rows.length){
      return Promise.reject({status:404 , msg: 'Not Found'})
  }
    return rows;
  })
};

exports.selectUsers = () => {
      let sqlQuery = `SELECT *  FROM users `;
   
  return db.query(sqlQuery).then(({ rows }) => {
    return { rows };
  });
};