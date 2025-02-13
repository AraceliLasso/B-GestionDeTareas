import express from "express";
import cors from "cors";
import "reflect-metadata";
import usuarioRouter from "./routes/usuarioRutas";
import tareaRouter from "./routes/tareasRutas";
import swagger from "./docs/swagger";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api", usuarioRouter);
server.use("/api/v1", tareaRouter);

swagger(server);
export default server;
