import type { Context } from "../context.js";
export declare const resolvers: {
    Query: {
        users: (parent: any, args: any, ctx: Context) => Promise<({
            appointments: {
                id: number;
                date: Date;
                startTime: Date;
                endTime: Date;
                createdAt: Date;
                userId: number;
            }[];
        } & {
            id: number;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: string;
        })[]>;
        appointments: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            date: Date;
            startTime: Date;
            endTime: Date;
            createdAt: Date;
            userId: number;
        }[]>;
    };
    Mutation: {
        signin: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: string;
        }>;
        singup: (parent: any, { input }: any, ctx: Context) => Promise<{
            token: string;
            user: {
                id: number;
                name: string;
                email: string;
                password: string;
                imageUrl: string;
                role: string;
            };
        }>;
        appointment: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            date: Date;
            startTime: Date;
            endTime: Date;
            createdAt: Date;
            userId: number;
        }>;
    };
};
//# sourceMappingURL=index.d.ts.map