import { z } from "zod";

export const createChatSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "chat title must be of 4 character long" })
      .max(100, { message: "chat title must be less than 100 characters" }),
    passcode: z
      .string()
      .min(4, { message: "chat password must be of 4 character long" })
      .max(25, { message: "chat title must be less than 25 characters" }),
  })
  .required();

export type createChatSchemaType = z.infer<typeof createChatSchema>;
