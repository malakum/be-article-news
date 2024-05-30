const users = require("../db/data/test-data/users");
const db = require("../db/connection");
//const format = require("pg-format");

exports.selectUsers = () => {
      let sqlQuery = `SELECT *  FROM users `;
   
  return db.query(sqlQuery).then(({ rows }) => {
    return { rows };
  });
};