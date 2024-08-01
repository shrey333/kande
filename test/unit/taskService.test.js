import { expect } from "chai";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../../src/services/taskService.js";
import Task from "../../src/models/task.js";

describe("Task Service", () => {
  beforeEach(async () => {
    await Task.sync({ force: true });
  });

  it("should create a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const task = await createTask(taskData);
    expect(task).to.have.property("id");
    expect(task.title).to.equal(taskData.title);
  });

  it("should get all tasks", async () => {
    const tasks = await getTasks();
    expect(tasks).to.be.an("array");
  });

  it("should get a task by ID", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const task = await createTask(taskData);
    const foundTask = await getTaskById(task.id);
    expect(foundTask).to.have.property("id", task.id);
  });

  it("should update a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const task = await createTask(taskData);
    const updatedData = {
      title: "Updated Task",
      description: "Updated description",
      status: "In Progress",
    };
    const updatedTask = await updateTask(task.id, updatedData);
    expect(updatedTask).to.have.property("title", updatedData.title);
  });

  it("should delete a task", async () => {
    const taskData = {
      title: "Test Task",
      description: "Task description",
      status: "Pending",
    };
    const task = await createTask(taskData);
    await deleteTask(task.id);
    const foundTask = await getTaskById(task.id);
    expect(foundTask).to.be.null;
  });
});
