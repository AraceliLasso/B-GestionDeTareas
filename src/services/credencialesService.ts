import { AppDataSource } from "../config/data-source";
import { CredencialEntity } from "../entities/credencialEntity";
import bcrypt from 'bcrypt';


export const CredentialModel = AppDataSource.getRepository(CredencialEntity);

export const crearUsuarioCredenciales = async (apellido: string, password: string): Promise<CredencialEntity> => {
    const credenciales = new CredencialEntity();
    credenciales.password = await bcrypt.hash(password, 10)
  
    await CredentialModel.save(credenciales);
    return credenciales;
};
