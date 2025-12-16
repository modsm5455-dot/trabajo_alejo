import { db } from "../config/db";

export const getUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

export const getUserById = async (id: number) => {
  const [rows]: any = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

export const createUser = async (name: string, email: string) => {
  await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [
    name,
    email,
  ]);
};

export const deleteUser = async (id: number) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
};
