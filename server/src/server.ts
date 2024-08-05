import express, { NextFunction, Request, Response } from "express";
import UserRouters from "./Routes/Routes";
const sequelize = require("./Utils/database");
const User = require("./Models/User");

sequelize.sync({ focus: true }).then(() => console.log("Database is ready"));

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use("/api", UserRouters);

app.listen(5050, () => {
  console.log("app is running");
});
