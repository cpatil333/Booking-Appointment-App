import { PrismaClient } from "@prisma/client";
import type { JwtUser } from "./auth/auth.js";
export type Context = {
    prisma: PrismaClient;
    user: JwtUser | null;
};
export declare function createContext({ req, res, }: {
    req: any;
    res: any;
}): Promise<Context>;
//# sourceMappingURL=context.d.ts.map