import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Task extends Model {}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
      defaultValue: "Pending",
      validate: {
        isIn: [["Pending", "In Progress", "Completed"]],
      },
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

export default Task;
