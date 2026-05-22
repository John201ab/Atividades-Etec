import express, {response} from 'express';
import { AppDataSource } from '../database/config.js';
import user from '../model/user.js';
import { IsNull } from 'typeorm';

const route = express.Router();
const userTable = AppDataSource.getRepository(user);

route.post("/", async (request, response) => {
    const {email, password} = request.body;

    const userLogin = await userTable.findOneBy({email, password, deletedAt: IsNull()})

    if(userLogin){
        return response.status(200).send({message: "Login efetuado com sucesso!"});
    } else{
        return response.status(401).send({message: "Login inválido"})
    }
    const userExist = await userTable.findOneBy({email, password});
    console.log(userExist);
})

export default route;