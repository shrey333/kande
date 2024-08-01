import Task from "../models/task.js";

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const getTasks = async () => {
  return await Task.findAll();
};

export const getTaskById = async (id) => {
  return await Task.findByPk(id);
};

export const updateTask = async (id, taskData) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return await task.update(taskData);
};

export const deleteTask = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) {
    throw new Error("Task not found");
  }
  return await task.destroy();
};
