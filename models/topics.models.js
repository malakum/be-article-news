const topics = require("../db/data/test-data/topics");
const db = require("../db/connection");


exports.selectTopics = () => {
      let sqlQuery = `SELECT slug, description  FROM topics `;
   
     return db.query(sqlQuery)
              .then(({ rows }) => {
                     return { rows };
                });
};

exports.checkTopic = (topic) => {
 
return db.query(`SELECT slug, description  FROM topics WHERE slug =$1`,[topic])
        .then(({ rows }) => {
                return  rows ;
             });
};
