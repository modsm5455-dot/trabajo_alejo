import { Request, Response } from "express";
import * as service from "../services/roomService";

export const getAll = async (_: Request, res: Response) => {
  const rooms = await service.getRooms();
  res.json(rooms);
};

export const getById = async (req: Request, res: Response) => {
  const room = await service.getRoomById(Number(req.params.id));
  if (!room) return res.status(404).json({ message: "Room not found" });
  res.json(room);
};

export const create = async (req: Request, res: Response) => {
  const { name, capacity } = req.body;

  const existingRoom = await service.getRoomByName(name);
  if (existingRoom) {
    return res.status(400).json({ message: "Room name already exists" });
  }

  await service.createRoom(name, capacity);
  res.status(201).json({ message: "Room created" });
};

export const update = async (req: Request, res: Response) => {
  const { name, capacity } = req.body;
  const id = Number(req.params.id);

  const room = await service.getRoomById(id);
  if (!room) return res.status(404).json({ message: "Room not found" });

  await service.updateRoom(id, name, capacity);
  res.json({ message: "Room updated" });
};

export const remove = async (req: Request, res: Response) => {
  await service.deleteRoom(Number(req.params.id));
  res.json({ message: "Room deleted" });
};
