import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.password;
    return attributes;
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
