import express, {response} from 'express';
import { AppDataSource } from '../database/config.js';
import user from '../model/user.js';
import { IsNull } from 'typeorm';
import {generateToken} from "../utils/jwt.js"
import { sendEmail } from "../helpers/nodemailer.js";
import { generateNewPassword} from "../utils/login.js";

const route = express.Router();
const userTable = AppDataSource.getRepository(user);

route.post("/", async (request, response) => {
    const {email, password} = request.body;

    const userLogin = await userTable.findOneBy({email, password, deletedAt: IsNull()})

    // const userExist = await userTable.findOneBy({email, password});
    // console.log(userExist);
    const token = generateToken({user:userLogin.name, email:userLogin.email, typeUser:userLogin.typeUser})

    return response.status(200).send({"response":"Login efetuado com sucesso", token});

    if(userLogin){
        return response.status(200).send({message: "Login efetuado com sucesso!", token});
    } else{
        return response.status(401).send({message: "Login inválido"})
    }

});

route.put("/reset", async (request, response) => {
  const { email } = request.body;

  const user = await userTable.findOneBy({ email });

  if (!user) {
    return response.status(400).send({ message: "Email inválido." });
  }

  const newPassword = generateNewPassword();

  await userTable.update({ email }, { password: newPassword });

  sendEmail(newPassword, user.email);

  return response.status(200).send({ 
    message: "Senha enviada para o email cadastrado." 
  });
});

export default route;