import request from "supertest";
import { expect } from "chai";
import app from "../../src/app.js";
import sequelize from "../../src/config/database.js";

describe("Task Routes", () => {
  let token;

  before(async () => {
    // Synchronize all models
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    // Register and login a user to get a valid token
    await request(app)
      .post("/api/register")
      .send({ username: "testuser", password: "password" });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    token = res.body.token;
  });

  it("should create a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const res = await request(app)
      .post("/api/tasks")
      .set("x-access-token", token)
      .send(taskData);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.title).to.equal(taskData.title);
  });

  it("should get all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("x-access-token", token);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should get a task by ID", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const createRes = await request(app)
      .post("/api/tasks")
      .set("x-access-token", token)
      .send(taskData);
    const res = await request(app)
      .get(`/api/tasks/${createRes.body.id}`)
      .set("x-access-token", token);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("id", createRes.body.id);
  });

  it("should update a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const createRes = await request(app)
      .post("/api/tasks")
      .set("x-access-token", token)
      .send(taskData);
    const updatedData = {
      title: "Updated Task",
      description: "Updated description",
      status: "In Progress",
    };
    const res = await request(app)
      .put(`/api/tasks/${createRes.body.id}`)
      .set("x-access-token", token)
      .send(updatedData);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("title", updatedData.title);
  });

  it("should delete a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const createRes = await request(app)
      .post("/api/tasks")
      .set("x-access-token", token)
      .send(taskData);
    const res = await request(app)
      .delete(`/api/tasks/${createRes.body.id}`)
      .set("x-access-token", token);
    expect(res.status).to.equal(204);
  });
});
