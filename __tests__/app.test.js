const { topicData,
    articleData,
    userData,
    commentData, } = require("../db/data/test-data/index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const request = require("supertest");
const allApiDataOutput = require("../endpoints.json");



beforeEach(() => seed({ topicData, articleData, userData, commentData }));
afterAll(() => db.end());

describe("/api/topics", () => {
  test("GET:200 sends an array of topics to the client", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.rows).toHaveLength(3);
       
          topics.rows.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
            });
        });
      });
  });
});

describe("/api", () => {
  const output = allApiDataOutput;
  
  test("GET:200 sends an array of all api to the client", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { allApi } = body;
        expect (allApi).toEqual(output);
      });
  });
});

describe("/api/article/:article_id", () => {
  test("GET:200 sends an article of passed article id to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
     
        const { article } = body;
     
          expect(article).toMatchObject({
            author: 'butter_bridge',
            title: 'Living in the shadow of a great man',
            article_id: 1,
            body:  'I find this existence challenging',
            topic: 'mitch',
            created_at: '2020-07-09T20:11:00.000Z',
             votes: 100,
             article_img_url :'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            });
       
      });
  });
  test("GET:400 Bad Requests- response with an error message for an invalid article id", () => {
    return request(app)
      .get("/api/articles/new_article")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
         expect(msg).toBe("Bad Request");
     
      });
  });
  test("GET:404 Not Found - response with an error message if the article does not exist", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
      
        const { msg } = body;
      
         expect(msg).toBe("Not Found");
      
      });
  });
});
describe("/api/articles", () => {
  test("GET:200 sends an array of articles to the client", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
          expect(articles.rows).toHaveLength(13);
             articles.rows.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
             votes: expect.any(Number),
             article_img_url :expect.any(String),
             comment_count : expect.any(String),
        });
      });
  });
  });
  test("GET:200 sends an array of articles in descending order by date to the client", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
     
        expect(articles.rows).toHaveLength(13);
       expect(articles.rows).toBeSortedBy("created_at",{ descending: true });

  });
  });
  test("GET:400 Bad Requests- response with an error message for an invalid sort_by", () => {
    return request(app)
      .get("/api/articles?sort_by= apple")
      .expect(400)
      .then(({ body }) => {
      
        const { msg } = body;
            expect(msg).toBe("Bad Request");
     
  });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET:200 sends an array of comments of passed article_id to the client", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
           expect(comments.rows).toHaveLength(11);
             comments.rows.forEach((comment) => {
             expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: 1,
          
        });
      });
  });
});

test("200  - responds with an empty array  if the article does not have any comments ", () => {
  return request(app)
    .get("/api/articles/2/comments")
    .expect(200)
    .then(({ body }) => {
        const {comments } = body;
        expect(comments.rows).toEqual([]);

});
});
test("GET:400 Bad Requests- responds with an error message for an invalid article id", () => {
  return request(app)
    .get("/api/articles/new_article/comments")
    .expect(400)
    .then(({ body }) => {
      const { msg } = body;
       expect(msg).toBe("Bad Request");
   
    });
});
 
  test("404 Not Found - response with an error message if the article does not exist in articles ", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Not Found");
 
  });
});
  });