import { Request, Response } from "express";
import * as service from "../services/userService";

export const getAll = async (_: Request, res: Response) => {
  const users = await service.getUsers();
  res.json(users);
};

export const getById = async (req: Request, res: Response) => {
  const user = await service.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const create = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  await service.createUser(name, email);
  res.status(201).json({ message: "User created" });
};

export const remove = async (req: Request, res: Response) => {
  await service.deleteUser(Number(req.params.id));
  res.json({ message: "User deleted" });
};
