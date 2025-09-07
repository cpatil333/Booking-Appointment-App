import type { Context } from "../context.js";
export declare const resolvers: {
    Query: {
        users: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            email: string;
            password: string;
            imageUrl: string;
            role: string;
        }[]>;
        appointments: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            date: Date;
            time: string;
            createdAt: Date;
            userId: number;
        }[]>;
    };
    Mutation: {};
};
//# sourceMappingURL=index.d.ts.map