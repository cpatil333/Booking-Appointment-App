import { sign } from "../auth/auth.js";
import type { Context } from "../context.js";
import bcrypt from "bcryptjs";

function requiredRole(ctx: Context, roles: String[]) {
  if (!ctx.user || !roles.includes(ctx.user.role)) {
    throw new Error("Not Authorized!");
  }
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.findMany({
        include: {
          appointments: true,
        },
      });
    },

    appointments: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.appointment.findMany();
    },
  },

  Mutation: {
    signin: async (parent: any, { input }: any, ctx: Context) => {
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

    singup: async (parent: any, { input }: any, ctx: Context) => {
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
          role: user.role as "USER" | "ADMIN",
        }),
        user,
      };
    },

    bookAppointment: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN", "USER"]);
      return ctx.prisma.appointment.create({
        data: {
          ...input,
        },
      });
    },
  },
};
