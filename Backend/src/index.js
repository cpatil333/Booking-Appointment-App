import express from "express";
import dotenv from "dotenv";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { createContext } from "./context.js";
import { expressMiddleware } from "@apollo/server/express4";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
await server.start();
app.use((req, res, next) => {
    if (!req.body && process.env.NODE_ENV !== "production") {
        req.body = {};
    }
    next();
});
app.use("/graphql", expressMiddleware(server, {
    context: async ({ req, res }) => await createContext({ req, res }),
}));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server start ready at http://localhost:${PORT}/graphql`);
});
//# sourceMappingURL=index.js.map