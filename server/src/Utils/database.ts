import { Sequelize } from "sequelize";

const sequelize = new Sequelize("UsersDB", "admin", "admin", {
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize
