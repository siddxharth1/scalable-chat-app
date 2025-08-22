import { Request, Response } from "express";
import prisma from "../config/db.config";

export const store = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const body = request.body;
    const user = request.user;
    if (!user) {
      return response.status(400).json({ message: "User not authenticated" });
    }
    await prisma.chatGroup.create({
      data: {
        title: body.title,
        passcode: body.passcode,
        user_id: user.id,
      },
    });
    response.status(200).json({ message: "chat group created successfully" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "somethinig went wrong. please try again later" });
  }
};

export const index = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const user = request.user;
    if (!user) {
      return response.status(400).json({ message: "User not authenticated" });
    }
    const groupsRaw = await prisma.chatGroup.findMany({
      // where: { user_id: user.id },
      orderBy: { created_at: "desc" },
      include: { _count: { select: { GroupUsers: true } } },
    });
    const groups = groupsRaw.map((g) => ({
      id: g.id,
      user_id: g.user_id,
      title: g.title,
      passcode: g.passcode,
      created_at: g.created_at,
      users_count: g._count.GroupUsers,
    }));
    response.status(200).json({
      message: "chat groups fetched successfully",
      data: groups,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "somethinig went wrong. please try again later" });
  }
};

export const show = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { id } = request.params;
    const user = request.user;
    if (!user) {
      return response.status(400).json({ message: "User not authenticated" });
    }
    const g = await prisma.chatGroup.findUnique({
      where: { id },
      include: { _count: { select: { GroupUsers: true } } },
    });
    if (!g) {
      return response
        .status(404)
        .json({ message: "chat group not found", data: null });
    }
    const group = {
      id: g.id,
      user_id: g.user_id,
      title: g.title,
      passcode: g.passcode,
      created_at: g.created_at,
      users_count: g._count.GroupUsers,
    };
    response.status(200).json({
      message: "chat group fetched successfully",
      data: group,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "somethinig went wrong. please try again later" });
  }
};

export const update = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { id } = request.params;
    const body = request.body;
    const group = await prisma.chatGroup.update({
      data: {
        title: body.title,
        passcode: body.passcode,
      },
      where: {
        id: id,
      },
    });
    response
      .status(200)
      .json({ message: "chat group updated  successfully", data: group });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "somethinig went wrong. please try again later" });
  }
};

export const destroy = async (
  request: Request,
  response: Response
): Promise<any> => {
  try {
    const { id } = request.params;
    const group = await prisma.chatGroup.delete({
      where: {
        id: id,
      },
    });
    response
      .status(200)
      .json({ message: "chat group deleted  successfully", data: group });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "somethinig went wrong. please try again later" });
  }
};
