import { Request, Response } from "express";
import { ContinentType } from "../interfaces/Continent";

const Continent = require("../Models/Continent");

const addContinent = (req: Request, res: Response) => {
    Continent.create(req.body).then(() => {
      res.send("Continent is inserted");
    });
  };
  
  const allContinent = (req: Request, res: Response) => {
    Continent.findAll().then((continent: ContinentType) => res.status(200).json({ continent }));
  };
  
  export default { addContinent, allContinent };