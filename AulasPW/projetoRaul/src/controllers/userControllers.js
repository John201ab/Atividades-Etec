import express, { request, response } from 'express';
import { AppDataSource } from '../database/config.js';
import userModel from '../model/user.js';
import { IsNull, Like } from 'typeorm';


const route = express();

const userTable = AppDataSource.getRepository(userModel);

//Listar todos os usuários, caso haja usuários cadastrados, retornar os dados dos usuários
route.get("/", async (request, response) => {
    const seletedUsers = await userTable.findBy({deletedAT: IsNull()});

    return response.status(200).send({
        "message": seletedUsers
    });
});

//Pesquisar pelo nome do usuário, caso o nome seja encontrado, retornar os dados do usuário, caso contrário, retornar uma mensagem de erro
route.get("/:name", async (request, response) => {
    const {name} = request.params;
    const selectUserByName = await userTable.findBy({name: Like(`%${name}%`), deletedAT: IsNull()});

    if(selectUserByName.length === 1) {
        return response.status(204).end(); }
    return response.status(200).send({"message": selectUserByName });
});

route.post("/", async (request, response) => {
    const {name, email, password, typeUser} = request.body;

    if(name.length < 2) {
        return response.status(400).send({
            "message": "O nome deve conter pelo menos 1 caracteres",
        }); }

    if(!email.includes("@")) {
        return response.status(400).send({
            "message": "O email deve conter o caracter @",
        }); }

    if(password.length < 6) {
        return response.status(400).send({
            "message": "A senha deve conter pelo menos 6 caracteres",
        }); }

    if(typeUser.toUpperCase() != "admin".toUpperCase() && typeUser.toUpperCase() !== "user".toUpperCase()) {
        return response.status(400).send({
            "message": "O tipo de usuário deve ser 'admin' ou 'user'",
        }); }
 
        const dataUser = userTable.create({name, email, password, typeUser});
        await userTable.save(dataUser);

        return response.status(201).send({
            "message": "User criado com sucesso",
        });        
    });

export default route;

route.put("/", async (request, response) => {
    const{name,email,password,typeUser,id} = request.body;
    

    if(name.length < 2) {
        return response.status(400).send({
            "message": "O nome deve conter pelo menos 1 caracteres",
        }); }

    if(!email.includes("@")) {
        return response.status(400).send({
            "message": "O email deve conter o caracter @",
        }); }

    if(password.length < 6) {
        return response.status(400).send({
            "message": "A senha deve conter pelo menos 6 caracteres",
        }); }

    if(typeUser.toUpperCase() != "admin".toUpperCase() && typeUser.toUpperCase() !== "user".toUpperCase()) {
        return response.status(400).send({
            "message": "O tipo de usuário deve ser 'admin' ou 'user'",
        }); }
 
        await userTable.update({id}, {name, email, password, typeUser});

        return response.status(200).send({
            "message": "Dados atualizados com sucesso",
        });        
    });

//hard delete
route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    await userTable.delete({id});

    return response.status(200).send({message: "Usuário excluido com sucesso"});
});

//soft delete
// route.delete("/:id", async (request, response) => {
//     const {id} = request.params;

//     await userTable.update({id}, {deletedAT: () => "CURRENT_TIMESTAMP"});

//     return response.status(200).send({message: "Usuário excluido com sucesso"});
// });