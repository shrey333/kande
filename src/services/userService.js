import User from "../models/user.js";

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};
