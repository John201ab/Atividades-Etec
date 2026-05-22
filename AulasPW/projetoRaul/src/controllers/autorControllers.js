import express, { response } from 'express';
import { AppDataSource } from '../database/config.js';
import autorModel from '../model/autor.js';
import { IsNull, Like } from 'typeorm';

const route = express();

const autorTable = AppDataSource.getRepository(autorModel);

//Listar todos os usuários, caso haja usuários cadastrados, retornar os dados dos usuários
route.get("/", async (request, response) => {
    const seletedUsers = await autorTable.findBy({deletedAT: IsNull()});

    return response.status(200).send({
        "message": seletedUsers
    });
});

//Pesquisar pelo nome do usuário, caso o nome seja encontrado, retornar os dados do usuário, caso contrário, retornar uma mensagem de erro
route.get("/:nomeAutor", async (request, response) => {
    const {nomeAutor} = request.params;
    const selectUserByName = await autorTable.findBy({nomeAutor: Like(`%${nomeAutor}%`), deletedAT: IsNull()});

    if(selectUserByName.length === 1) {
        return response.status(204).end(); }
    return response.status(200).send({"message": selectUserByName });
});

route.post("/", async (request, response) => {
    const {nomeAutor, sexo, dataDeNascimento, nacionalidade, fotoAutor} = request.body;

    if(nomeAutor.length < 2) {
        return response.status(400).send({
            "message": "O nome do Autor deve conter pelo menos 1 caracteres",
        }); }

    if(sexo.toUpperCase() != "masculino".toUpperCase() && sexo.toUpperCase() !== "feminino".toUpperCase()) {
        return response.status(400).send({
            "message": "O sexo do usuário deve ser 'masculino' ou 'feminino'",
        }); }

    if(dataDeNascimento.length < 10) {
        return response.status(400).send({
            "message": "A Data de Nascimento deve conter pelo menos 10 caracteres",
        }); }

    if(nacionalidade.length < 2) {
        return response.status(400).send({
            "message": "A nacionalidade deve conter pelo menos 1 caracteres",
        }); }

    if(fotoAutor.length < 2) {
        return response.status(400).send({
            "message": "A URL da foto deve conter pelo menos 1 caracteres",
        }); }

 
        const dataAutor = autorTable.create({nomeAutor, sexo, dataDeNascimento, nacionalidade, fotoAutor});
        await autorTable.save(dataAutor);

        return response.status(201).send({
            "message": "Autor criado com sucesso",
        });        
    });

export default route;
