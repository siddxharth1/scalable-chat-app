import { Request, Response } from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";

interface LoginPayloadType {
  name: string;
  email: string;
  provider: string;
  oauth_id: string;
  image?: string;
}

export async function login(
  request: Request,
  response: Response
): Promise<any> {
  const body: LoginPayloadType = request.body;
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: body,
      });
    }
    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return response.json({
      message: "Login successful",
      user: {
        ...user,
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
}

// class AuthController {
//   static async login(request: Request, response: Response) {
//     const body: LoginPayloadType = request.body;
//     try {
//       let user = await prisma.user.findUnique({
//         where: {
//           email: body.email,
//         },
//       });
//       if (!user) {
//         user = await prisma.user.create({
//           data: body,
//         });
//       }
//       const jwtPayload = {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       };
//       const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
//         expiresIn: "1d",
//       });
//       return response.json({
//         message: "Login successful",
//         user: {
//           ...user,
//           token: "Bearer " + token,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       return response.status(500).json({
//         message: "Internal server error",
//       });
//     }
//   }
// }
// export default AuthController;
