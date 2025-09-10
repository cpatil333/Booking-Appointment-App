// context.ts
import { PrismaClient } from "@prisma/client";
import { getUserFromReq } from "./auth/auth.js"; // your jwt utils
const prisma = new PrismaClient();
export async function createContext({ req, res, }) {
    const user = getUserFromReq(req); // extract from Authorization header
    return { prisma, user };
}
//# sourceMappingURL=context.js.map