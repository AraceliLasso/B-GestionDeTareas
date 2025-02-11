import express from "express";
import cors from "cors";
import "reflect-metadata";  // Esto es importante para que los decoradores funcionen
import usuarioRouter from "./routes/usuarioRutas";
import tareaRouter from "./routes/tareasRutas";


const server =express();

//middlewares
server.use(express.json());
server.use(cors());
//routes
server.use("/api", usuarioRouter);
server.use("/api/v1", tareaRouter);



export default server;