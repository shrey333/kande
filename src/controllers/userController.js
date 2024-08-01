import { register, login } from "../middleware/auth.js";

export const registerController = async (req, res) => {
  await register(req, res);
};

export const loginController = async (req, res) => {
  await login(req, res);
};
