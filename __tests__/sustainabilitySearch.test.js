const request = require("supertest");
const { faker } = require("@faker-js/faker");

let db;
let app;

beforeAll(async () => {
  const server = require("../index");
  db = server.db;
  app = server.app;
  try {
    await db.sequelize.sync();
  } catch (error) {
    console.log(`
        You did something wrong dummy!
        ${error}
      `);
  }
});

afterAll(async () => {
  try {
    db.sequelize.close();
  } catch (error) {
    console.log(`
          You did something wrong dummy!
          //${error}
        `);
    throw error;
  }
});

describe("Sustainability integration test", () => {
  test("expect GET /api/sustainability/search is successful", async () => {
    const origin = faker.location.city();
    const destination = faker.location.city();
    const sustainabilityScore = String(faker.number.int(4));
    try {
      const sustainabilityInfo =
        await db.sequelize.models.SustainabilityInformation.create({
          destination,
          sustainabilityScore,
        });

      const response = await request(app).get(
        `/api/sustainability/search?origin=${origin}&destination=${destination}`
      );
      expect(response.status).toBe(200);
      expect(response.body.data.destination).toBe(
        sustainabilityInfo.destination
      );
      expect(esponse.body.data.sustainabilityScore).toBe(
        sustainabilityInfo.sustainabilityScore
      );
    } catch (err) {
      console.log(err);
    }
  });
  
  test(" expect GET /api/sustainability/search to fail", async () => {
    const origin = "";
    const destination = faker.location.city();
    try {
      const response = await request(app).get(
        `/api/sustainability/search?origin=${origin}&destination=${destination}`
      );
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("");
      expect(esponse.body.message).toBe('"origin" is required');

      const origin2 = faker.location.city();
      const destination2 = "";
      const response2 = await request(app).get(
        `/api/sustainability/search?origin=${origin2}&destination=${destination2}`
      );
      expect(response2.status).toBe(422);
      expect(esponse.body.data.sustainabilityScore).toBe(
        '"destination" is required'
      );
    } catch (err) {
      console.log(err);
    }
  });
});
