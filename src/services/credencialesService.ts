import { AppDataSource } from "../config/data-source";
import { CredencialEntity } from "../entities/credencialEntity";


export const CredentialModel = AppDataSource.getRepository(CredencialEntity);

export const crearUsuarioCredenciales = async (username: string, password: string): Promise<CredencialEntity> => {
    const newUserCredential: CredencialEntity = await CredentialModel.create({
        username,
        password
    });
    await CredentialModel.save(newUserCredential);
    return newUserCredential;
};
