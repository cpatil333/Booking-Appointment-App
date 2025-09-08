import { sign } from "../auth/auth.js";
import bcrypt from "bcryptjs";
export const resolvers = {
    Query: {
        users: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany({
                include: {
                    appointments: true,
                },
            });
        },
        appointments: async (parent, args, ctx) => {
            return ctx.prisma.appointment.findMany();
        },
    },
    Mutation: {
        signin: async (parent, { input }, ctx) => {
            const user = await ctx.prisma.user.findFirst({
                where: { email: input.email },
            });
            if (user) {
                throw new Error("Email already exist...");
            }
            const hassedPassword = await bcrypt.hash(input.password, 10);
            return await ctx.prisma.user.create({
                data: {
                    ...input,
                    password: hassedPassword,
                },
            });
        },
        singup: async (parent, { input }, ctx) => {
            const user = await ctx.prisma.user.findFirst({
                where: { email: input.email },
            });
            if (!user) {
                throw new Error("Email does not exist...");
            }
            const matchPassword = await bcrypt.compare(input.password, user.password);
            if (!matchPassword) {
                throw new Error("Email and password does not matched...");
            }
            return {
                token: sign({
                    id: user.id,
                    name: user.name,
                    role: user.role,
                }),
                user,
            };
        },
        appointment: async (parent, { input }, ctx) => {
            return ctx.prisma.appointment.create({
                data: {
                    ...input,
                },
            });
        },
    },
};
//# sourceMappingURL=index.js.map