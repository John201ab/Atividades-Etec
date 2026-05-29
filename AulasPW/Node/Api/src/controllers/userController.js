import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import userModel from "../model/user.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();

const userTable = AppDataSource.getRepository(userModel);
route.get("/", async (request, response) => {
  const seletedUser = await userTable.findBy({ deletedAt: IsNull() });
  return response.status(200).send({ message: seletedUser });
});

route.get("/:name", async (request, response) => {
  const {name } = request.params;
  const selectedUserByName = await userTable.findBy({
    name: Like(`%${name}%`),
    deletedAt: IsNull(),
  });
  if (selectedUserByName.length < 1) {
    return response.status(204).end();
  }
  return response.status(200).send({ message: selectedUserByName });
});
route.post("/", async (request, response) => {
  const { name, email, password, typeUser } = request.body;

  if (name.length < 2) {
    return response.status(400).send({
      message: "Nome deve ter mais que 2 caracteres",
    });
  }

  if (!email.includes("@") || !email.includes(".com")) {
    return response.status(400).send({
      message: "Email inválido. Deve conter @ e domínio.",
    });
  }

  if (password.length <= 6 || !password.includes("@")) {
    return response.status(400).send({
      message:
        "Senha deve ter mais de seis caracteres e ter '@' tente novamente.",
    });
  }
  let normalizedTypeUser = typeUser.toLowerCase();
  if (normalizedTypeUser !== "admin" && normalizedTypeUser !== "comum") {
    return response.status(400).send({
      message: "Tipo de usuario invalido escolha um tipo de usuario valido",
    });
  }

  const dataUser = userTable.create({
    name,
    email,
    password,
    typeUser: normalizedTypeUser,
  });
  await userTable.save(dataUser);

  return response
    .status(201)
    .send({ message: "Usuario cadastrado com sucesso!" });
});


route.put("/:id", async (request, response) => {
  const { name, email, password, typeUser } = request.body;
  const { id } = request.params;
  if (name.length < 2) {
    return response.status(400).send({
      message: "Nome deve ter mais que 2 caracteres",
    });
  }
  if (!email.includes("@") || !email.includes(".com")) {
    return response.status(400).send({
      message: "Email inválido. Deve conter @ e domínio.",
    });
  }

  if (password.length <= 6 || !password.includes("@")) {
    return response.status(400).send({
      message:
        "Senha deve ter mais de seis caracteres e ter '@' tente novamente.",
    });
  }
  let normalizedTypeUser = typeUser.toLowerCase();
  if (normalizedTypeUser !== "admin" && normalizedTypeUser !== "comum") {
    return response.status(400).send({
      message: "Tipo de usuario invalido escolha um tipo de usuario valido",
    });
  }
  await userTable.update({id}, {name,email,password,typeUser})
  return response.status(200).send({message:"usuario/a atualizado com sucesso"});
});

route.delete("/:id", async (request, response) =>{
  const {id} = request.params;
  await userTable.delete({id});
  return response.status(200).send({message: "Usuario/a excluido com sucesso"});
});

export default route;
