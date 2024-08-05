import { Request, Response, NextFunction } from "express";
import { UsersType } from "../interfaces/User";

const User = require("../Models/User");

const addUser = (req: Request, res: Response) => {
  User.create(req.body).then(() => {
    res.status(200).json('User is inserted');
  });
};

const allUsers = (req: Request, res: Response) => {
  User.findAll().then((users: UsersType) => res.status(200).json({ users }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  User.destroy({ where: { id: userId } }).then(
    res.status(200).json("User id deleted")
  );
};

const findByIdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  User.findOne({ where: { Id: userId } }).then((users: UsersType) =>
    res.status(200).json({ users })
  );
};

export default { addUser, allUsers, deleteUser, findByIdUser };
