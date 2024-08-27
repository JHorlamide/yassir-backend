import http from "http";
import mongoose from "mongoose";
import supertest, { SuperAgentTest } from "supertest";
import main from "../../../server";

describe("Air Quality API", () => {
  let server: http.Server;
  let request: SuperAgentTest;

  beforeEach(async () => {
    server = await main();
    request = supertest.agent(server);
  });

  afterEach(async () => {
    server.close();
    await mongoose.connection.close();
  });

  it('should fetch air quality data for a given coordinate', async () => {
    const lat = 48.856613;
    const lon = 2.352222;

    const res = await request.get(`/api/air-quality?longitude=${lon}&latitude=${lat}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("result");
    expect(res.body).toMatchObject({ status: "Success" });
  });

  it('should fetch the datetime when Paris was most polluted', async () => {
    const res = await request.get('/api/most-polluted');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("result");
    expect(res.body).toMatchObject({ status: "Success" });
  });

  it('should throw an error if the given coordinate are invalid', async () => {
    const lat = 2.3522;
    const lon = 48.8566;

    const res = await request.get(`/api/air-quality?longitude=${lon}&latitude=${lat}`);
    expect(res.status).toEqual(500);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toMatchObject({ status: 500 });
  });

  it('should throw an error if there is no given lat', async () => {
    const lon = 2.352222;

    const res = await request.get(`/api/air-quality?longitude=${lon}`);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toMatchObject({ status: "Failure" });
    expect(res.body).toMatchObject({ message: "Latitude and Longitude are both required" });
  });

  it('should throw an error if there is no given lon', async () => {
    const lat = 48.856613;

    const res = await request.get(`/api/air-quality?latitude=${lat}`);
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toMatchObject({ status: "Failure" });
    expect(res.body).toMatchObject({ message: "Latitude and Longitude are both required" });
  });
})