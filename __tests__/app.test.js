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