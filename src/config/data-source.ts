import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_NAME, DB_PASSWORD } from "./envs";
import { UsuarioEntity } from "../entities/usuarioEntity";
import { CredencialEntity } from "../entities/credencialEntity";
import { TareaEntity } from "../entities/tareaEntity";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    //sin dropSchema, se guardan las solicitudes http sin importar si 
    //cierro y abro el servidor
    // dropSchema: true,
    logging: false,
    synchronize: true,
    entities: [UsuarioEntity, CredencialEntity, TareaEntity],
    migrations: [], // Aquí dejamos el arreglo vacío, ya que no lo configuramos directamente
    subscribers: [],

})