import { Request, Response } from "express";
import prisma from "../config/db.config";

interface GroupUserType {
  name: string;
  group_id: string;
}

export const chatGroupUserIndex = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { group_id } = request.query;
    const users = await prisma.groupUsers.findMany({
      where: {
        group_id: group_id as string,
      },
    });
    return response
      .status(200)
      .json({ message: "data fetched successfully", data: users });
  } catch (error) {
    console.log("somthing went wrong", error);
    response.status(500).json({ message: "somthing went wrong" });
  }
};

export const chatGroupUserStore = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const body: GroupUserType = request.body;
    const user = await prisma.groupUsers.create({
      data: body,
    });

    return response
      .status(200)
      .json({ message: "user added successfully", data: user });
  } catch (error) {
    console.log("somthing went wrong", error);
    response.status(500).json({ message: "somthing went wrong" });
  }
};
