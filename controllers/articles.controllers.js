const { selectArticleById , selectArticles, updateArticleByArticleId } = require("../models/articles.models");
const { checkTopic } = require("../models/topics.models");

exports.getArticleById = (req, res, next) => {
      const {article_id} = req.params;
   
    selectArticleById(article_id).then((article) => {      
      res.status(200).send({article});
      }).catch(next);
};

exports.getArticles = (req, res, next) => {
  const {topic,sort_by} = req.query;

  
selectArticles(topic,sort_by).then((articles) => {  
 
  if (topic && articles.rows.length===0){
    return checkTopic(topic).then((topicData)=>{
      if (topicData.length>0)
        res.status(200).send({articles});
      
      else{
        return Promise.reject({status:404, msg :'Not Found'});
      }
    }).catch(next)
    }
  
   res.status(200).send({articles});
  }).catch(next);

};

exports.patchArticleByArticleId = (req, res, next) => {
  const {article_id} = req.params;
  const { inc_votes } = req.body;
  
updateArticleByArticleId( article_id, inc_votes).then((article) => {  
   res.status(200).send({article});
  }).catch(next);
};