import { Request, Response } from "express";
import { BookingService } from "../services/bookingService";


export const getAll = async (_req: Request, res: Response) => {
  const bookings = await BookingService.getAll();
  res.json(bookings);
};


export const getByRoomAndDate = async (req: Request, res: Response) => {
  const roomId = Number(req.params.id);
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "date is required" });
  }

  const bookings = await BookingService.getByRoom(
    roomId,
    String(date)
  );

  res.json(bookings);
};

export const create = async (req: Request, res: Response) => {
  const { userId, roomId, date, startTime, endTime } = req.body;

  const count = await BookingService.countByUserAndDate(userId, date);
  if (count >= 3) {
    return res
      .status(400)
      .json({ message: "User reached daily booking limit" });
  }

  const hasOverlap = await BookingService.hasOverlap(
    roomId,
    date,
    startTime,
    endTime
  );

  if (hasOverlap) {
    return res
      .status(400)
      .json({ message: "Room already booked in this time range" });
  }

  await BookingService.create(userId, roomId, date, startTime, endTime);

  res.status(201).json({ message: "Booking created" });
};

