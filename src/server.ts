import express from "express";
import cors from "cors";
import "reflect-metadata";  // Esto es importante para que los decoradores funcionen


const server =express();

//middlewares
server.use(express.json());
server.use(cors());
//routes


export default server;