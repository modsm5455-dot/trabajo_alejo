import { db } from "../config/db";

export const BookingService = {

  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM bookings");
    return rows;
  },

  getByRoom: async (roomId: number, date: string) => {
    const [rows] = await db.query(
      "SELECT * FROM bookings WHERE room_id = ? AND date = ?",
      [roomId, date]
    );
    return rows;
  },


  countByUserAndDate: async (userId: number, date: string) => {
    const [rows]: any = await db.query(
      "SELECT COUNT(*) as total FROM bookings WHERE user_id = ? AND date = ?",
      [userId, date]
    );
    return rows[0].total;
  },


  hasOverlap: async (
    roomId: number,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    const [rows]: any = await db.query(
      `
      SELECT COUNT(*) as total
      FROM bookings
      WHERE room_id = ?
        AND date = ?
        AND (
          start_time < ?
          AND end_time > ?
        )
      `,
      [roomId, date, endTime, startTime]
    );
    return rows[0].total > 0;
  },


  create: async (
    userId: number,
    roomId: number,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    await db.query(
      `
      INSERT INTO bookings (user_id, room_id, date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?)
      `,
      [userId, roomId, date, startTime, endTime]
    );
  },
};
