import { Model, DataTypes } from "sequelize";
const sequelize = require("../Utils/database");

class User extends Model {}

User.init(
  {
    Imie: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    Nazwisko: {
      type: DataTypes.STRING,
      validate: {
        isLengthCorrect(value: string) {
          if (this.Kontynent === "Afryka" && (!value || value.length < 2)) {
            throw new Error(
              "Nazwisko musi mieć minimum 2 znaki, gdy wybrany kraj to Afryka"
            );
          }
        },
      },
    },
    DataUrodzenia: {
      type: DataTypes.STRING,
    },
    Kontynent: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;
