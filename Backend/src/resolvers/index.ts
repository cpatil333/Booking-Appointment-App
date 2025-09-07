import { sign } from "../auth/auth.js";
import type { Context } from "../context.js";
import bcrypt from "bcryptjs";

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.findMany();
    },

    appointments: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.appointment.findMany();
    },
  },
  Mutation: {},
};
