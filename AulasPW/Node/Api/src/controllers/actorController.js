import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import actorModel from "../model/actor.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();

const actorTable = AppDataSource.getRepository(actorModel);
route.get("/", async (request, response) => {
    const seletedActor = await actorTable.findBy({ deletedAt: IsNull() });
    return response.status(200).send({ message: seletedActor });
});

route.get("/:actor", async (request, response) => {
    const { actor } = request.params;
    const selectedActorByName = await actorTable.findBy({
        name: Like(`%${name}%`),
        deleteAt: IsNull(),
    });
    if (selectedActorByName.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ message: selectedActorByName });
});
route.post("/", async (request, response) => {
    const { name, sexo, data_nascimento, nacionalidade, foto_actor } = request.body;

    if (name.length < 2) {
        return response.status(400).send({
            message: "Nome deve ter mais que 2 caracteres",
        });
    }
    let normalizedSexo = sexo.toLowerCase();
    if (normalizedSexo !== "female" && normalizedSexo !== "male") {
        return response.status(400).send({
            message: "Tipo de sexo invalido escolha um tipo valido",
        });
    }

    if (!data_nascimento.includes("/") || data_nascimento.length <= 6) {
        return response.status(400).send({
            message:
                "data de nascimento tem que ter / entre datas e formatacao padrao, exemplo: 2026/04/22",
        });
    }

    if (nacionalidade.length < 2) {
        return response.status(400).send({
            message: "Quantidade de caracteries invalida coloque mais caracteres",
        });
    }

    if (foto_actor.length < 2 || !foto_actor.includes("/")) {
        return response.status(400).send({
            message: "defina o diretorio para a imagem",
        });
    }

    const dataActor = actorTable.create({
        name,
        sexo: normalizedSexo,
        data_nascimento,
        nacionalidade,
        foto_actor,
    });
    await actorTable.save(dataActor);

    return response
        .status(201)
        .send({ message: "Autor cadastrado com sucesso!" });
});
route.put("/:id", async (request, response) => {
    const {name, sexo, data_nascimento, nacionalidade, foto_actor} = request.body;
    const { id } = request.params;

    if (name.length < 2) {
        return response.status(400).send({
            message: "Nome deve ter mais que 2 caracteres",
        });
    }
    let normalizedSexo = sexo.toLowerCase();
    if (normalizedSexo !== "female" && normalizedSexo !== "male") {
        return response.status(400).send({
            message: "Tipo de sexo invalido escolha um tipo valido",
        });
    }

    if (!data_nascimento.includes("/") || data_nascimento.length <= 6) {
        return response.status(400).send({
            message:
                "data de nascimento tem que ter / entre datas e formatacao padrao, exemplo: 2026/04/22",
        });
    }

    if (nacionalidade.length < 2) {
        return response.status(400).send({
            message: "Quantidade de caracteries invalida coloque mais caracteres",
        });
    }

    if (foto_actor.length < 2 || !foto_actor.includes("/")) {
        return response.status(400).send({
            message: "defina o diretorio para a imagem",
        });
    }
    await actorTable.update({ id }, {  name, sexo, data_nascimento, nacionalidade, foto_actor })
    return response.status(200).send({ message: "Autor atualizado com sucesso" });
})
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await actorTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ message: "Autor excluido com sucesso" });
});

export default route;
