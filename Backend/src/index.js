import express from "express";
import dotenv from "dotenv";
import { typeDefs } from "./schema/index.js";
import { resolvers } from "./resolvers/index.js";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { createContext } from "./context.js";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { fileURLToPath } from "url";
import routerUpload from "./middleware/upload.js";
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use("/uploads", routerUpload);
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));
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