import express, { request, response } from "express";
import { AppDataSource } from "../database/config.js";
import generoModel from "../model/genero.js";
import { IsNull, Like } from "typeorm";

const route = express.Router();

const generoTable = AppDataSource.getRepository(generoModel);
route.get("/", async (request, response) => {
    const seletedGenero = await generoTable.findBy({ deletedAt: IsNull() });
    return response.status(200).send({ message: seletedGenero });
});

route.get("/:genero", async (request, response) => {
    const { genero } = request.params;
    const selectedGeneroByName = await generoTable.findBy({
        name: Like(`%${name}%`),
        deleteAt: IsNull(),
    });
    if (selectedGeneroByName.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ message: selectedUserByName });
});
route.post("/", async (request, response) => {
    const { name } = request.body;

    if (name.length < 2) {
        return response.status(400).send({
            message: "Genero deve ter mais que 2 caracteres",
        });
    }
    const dataGenero = generoTable.create({
        name,
    });

    await generoTable.save(dataGenero);

    return response
        .status(201)
        .send({ message: "Genero adicionado com sucesso!" });
});
route.put("/:id", async (request, response) => {
    const { name } = request.body;
    const { id } = request.params;
    if (name.length < 2) {
        return response.status(400).send({
            message: "Genero deve ter mais que 2 caracteres",
        });
    }
    await generoTable.update({ id }, { name })
    return response.status(200).send({ message: "Genero atualizado com sucesso" });
})
route.delete("/:id", async (request, response) => {
    const { id } = request.params;
    await generoTable.update({ id }, { deletedAt: () => "CURRENT_TIMESTAMP" });
    return response.status(200).send({ message: "Genero excluido com sucesso" });
});
export default route;
