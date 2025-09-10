// context.ts
import { PrismaClient } from "@prisma/client";
import { getUserFromReq } from "./auth/auth.js"; // your jwt utils
import type { JwtUser } from "./auth/auth.js"; // your jwt utils

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  user: JwtUser | null;
};

export async function createContext({
  req,
  res,
}: {
  req: any;
  res: any;
}): Promise<Context> {
  const user = getUserFromReq(req); // extract from Authorization header
  return { prisma, user };
}
