const topics = require("../db/data/test-data/topics");
const db = require("../db/connection");
//const format = require("pg-format");

exports.selectTopics = () => {
      let sqlQuery = `SELECT slug, description  FROM topics `;
   
  return db.query(sqlQuery).then(({ rows }) => {
    return { rows };
  });
};