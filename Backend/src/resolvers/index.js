import { sign } from "../auth/auth.js";
import bcrypt from "bcryptjs";
export const resolvers = {
    Query: {
        users: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany();
        },
        appointments: async (parent, args, ctx) => {
            return ctx.prisma.appointment.findMany();
        },
    },
    Mutation: {},
};
//# sourceMappingURL=index.js.map