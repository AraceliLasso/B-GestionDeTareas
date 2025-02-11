import express from "express";
import cors from "cors";
import "reflect-metadata";  // Esto es importante para que los decoradores funcionen
import usuarioRouter from "./routes/usuarioRutas";


const server =express();

//middlewares
server.use(express.json());
server.use(cors());
//routes
server.use(usuarioRouter);


export default server;