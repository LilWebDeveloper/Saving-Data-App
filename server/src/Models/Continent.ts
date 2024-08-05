import { Model, DataTypes } from "sequelize";
const sequelize = require("../Utils/database");

class Continent extends Model {}

Continent.init(
  {
    Kontynent: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "continent",
    timestamps: false,
  }
);

module.exports = Continent;
