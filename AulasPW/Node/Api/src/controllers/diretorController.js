import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import diretorModel from "../model/diretor.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();

const diretorTable = AppDataSource.getRepository(diretorModel);
route.get("/", async (request, response) => {
    const seletedDiretor = await diretorTable.findBy({ deletedAt: IsNull() });
    return response.status(200).send({ message: seletedDiretor });
});

route.get("/:diretor", async (request, response) => {
    const { diretor } = request.params;
    const selectedDiretorByName = await diretorTable.findBy({
        name: Like(`%${name}%`),
        deleteAt: IsNull(),
    });
    if (selectedDiretorByName.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ message: selectedDiretorByName });
});
route.post("/", async (request, response) => {
    const { name, sexo, data_nascimento, nacionalidade, foto_diretor } = request.body;

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
                "data de nascimento tem que ter / entre datas e formatacao padrao, exemplo: 20/04/2026 ou 20/04/26",
        });
    }

    if (nacionalidade.length < 2) {
        return response.status(400).send({
            message: "Quantidade de caracteries invalida coloque mais caracteres",
        });
    }

    if (foto_diretor.length < 2 || !foto_diretor.includes("/")) {
        return response.status(400).send({
            message: "defina o diretorio para a imagem",
        });
    }

    const dataDiretor = diretorTable.create({
        name,
        sexo: normalizedSexo,
        data_nascimento,
        nacionalidade,
        foto_diretor,
    });
    await diretorTable.save(dataDiretor);

    return response
        .status(201)
        .send({ message: "Diretor/a cadastrado/a com sucesso!" });
});
route.put("/:id", async (request, response) => {
    const { name, sexo, data_nascimento, nacionalidade, foto_diretor } = request.body;
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
                "data de nascimento tem que ter / entre datas e formatacao padrao, exemplo: 2026/04/22."
        });
    }

    if (nacionalidade.length < 2) {
        return response.status(400).send({
            message: "Quantidade de caracteries invalida coloque mais caracteres",
        });
    }

    if (foto_diretor.length < 2 || !foto_diretor.includes("/")) {
        return response.status(400).send({
            message: "defina o diretorio para a imagem",
        });
    }

    await diretorTable.update({ id }, { name, sexo, data_nascimento, nacionalidade, foto_diretor })
    return response.status(200).send({ message: "Diretor/a atualizado com sucesso" });
})
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await diretorTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ message: "Diretor/a excluido com sucesso" });
});

export default route;