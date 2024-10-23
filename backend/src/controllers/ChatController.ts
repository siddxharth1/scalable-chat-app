import { Request, Response } from "express";
import prisma from "../config/db.config";

export const getAllChats = async (
  request: Request,
  response: Response
): Promise<any> => {
  const { groupId } = request.params;
  const chats = await prisma.chats.findMany({
    where: {
      group_id: groupId,
    },
  });
  return response.status(200).json({
    data: chats,
  });
};
