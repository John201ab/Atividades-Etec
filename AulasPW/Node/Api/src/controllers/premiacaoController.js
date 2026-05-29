import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import premiacaoModel from "../model/premiacao.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();

const premiacaoTable = AppDataSource.getRepository(premiacaoModel);
route.get("/", async (request, response) => {
    const seletedPremiacao = await premiacaoTable.findBy({ deletedAt: IsNull() });
    return response.status(200).send({ message: seletedPremiacao });
});

route.get("/:premiacao", async (request, response) => {
    const { premiacao } = request.params;
    const selectedPremiacaoByName = await premiacaoTable.findBy({
        name: Like(`%${premiacao}%`),
        deletedAt: IsNull(),
    });
    if (selectedPremiacaoByName.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ message: selectedPremiacaoByName });
});
route.post("/", async (request, response) => {
    const { name, valor_premiacao } = request.body;

    if (name.length < 2) {
        return response.status(400).send({
            message: "Premiacao deve ter mais que 2 caracteres",
        });
    }
    if (valor_premiacao < 99 || valor_premiacao.includes(",")) {
        return response.status(400).send({
            message: "O valor da premiacao deve ter mais que 2 digitos e deve ser um numero inteiro sem virgulas",
        });
    }
    const dataPremiacao = premiacaoTable.create({
        name,
        valor_premiacao,
    });

    await premiacaoTable.save(dataPremiacao);

    return response
        .status(201)
        .send({ message: "Premiacao adicionado com sucesso!" });
});
route.put("/:id", async (request, response) => {
    const { name, valor_premiacao } = request.body;
    const { id } = request.params;
    if (name.length < 2) {
        return response.status(400).send({
            message: "Premiacao deve ter mais que 2 caracteres",
        });
    }
    if (valor_premiacao < 99 || valor_premiacao.includes(",")) {
        return response.status(400).send({
            message: "O valor da premiacao deve ter mais que 2 digitos e deve ser um numero inteiro sem virgulas",
        });
    }
    await premiacaoTable.update({ id }, { name, valor_premiacao })
    return response.status(200).send({ message: "Premiacao atualizada com sucesso" });
})
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await premiacaoTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ message: "Premiacao excluido com sucesso" });
});
export default route;
