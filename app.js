const express = require("express") ;
const app = express();
const { getTopics } = require("./controllers/topics.controllers.js");

const { getAllApi }= require("./controllers/allApi.controllers.js");


app.use(express.json());


app.get('/api/topics', getTopics);

app.get('/api', getAllApi);

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: 'Bad Request' });
    } 
    else {
        next(err);
    }
   });

  app.use((err, req, res, next) => {
  
    if (err.status && err.msg) {
    
        res.status(err.status).send({ msg: err.msg });
    }
   
    });
app.use((err, req, res, next) => {
 
    res.status(500).send('Server Error!');
  });


module.exports = app;