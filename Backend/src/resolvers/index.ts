import { sign } from "../auth/auth.js";
import type { Context } from "../context.js";
import bcrypt from "bcryptjs";
import { format } from "date-fns";

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

    myAppointments: async (parent: any, { id }: any, ctx: Context) => {
      requiredRole(ctx, ["USER", "ADMIN"]);
      const appts = await ctx.prisma.appointment.findMany({
        where: { userId: parseInt(id) },
        orderBy: { startTime: "asc" },
      });
      // Convert date fields
      return appts.map((a) => ({
        ...a,
        date: format(a.date, "yyyy-MM-dd"), // "2025-09-11"
        startTime: format(a.startTime, "HH:mm:ss"), // "09:00:00"
        endTime: format(a.endTime, "HH:mm:ss"), // "09:30:00"
      }));
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
      requiredRole(ctx, ["USER", "ADMIN"]);
      return ctx.prisma.appointment.create({
        data: {
          date: new Date(input.date),
          startTime: new Date(input.startTime),
          endTime: new Date(input.endTime),
          userId: parseInt(input.userId),
        },
        include: { user: true },
      });
    },

    cancelAppointment: async (parent: any, { id }: any, ctx: Context) => {
      return await ctx.prisma.appointment.delete({ where: { id: Number(id) } });
      return true;
    },
  },
};
