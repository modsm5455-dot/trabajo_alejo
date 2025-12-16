import { db } from "../config/db";

export const getRooms = async () => {
  const [rows] = await db.query("SELECT * FROM rooms");
  return rows;
};

export const getRoomById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM rooms WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const getRoomByName = async (name: string) => {
  const [rows]: any = await db.query(
    "SELECT * FROM rooms WHERE name = ?",
    [name]
  );
  return rows[0];
};

export const createRoom = async (name: string, capacity: number) => {
  await db.query(
    "INSERT INTO rooms (name, capacity) VALUES (?, ?)",
    [name, capacity]
  );
};

export const updateRoom = async (
  id: number,
  name: string,
  capacity: number
) => {
  await db.query(
    "UPDATE rooms SET name = ?, capacity = ? WHERE id = ?",
    [name, capacity, id]
  );
};

export const deleteRoom = async (id: number) => {
  await db.query("DELETE FROM rooms WHERE id = ?", [id]);
};
