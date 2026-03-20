import express from "express";

const route = express.Router();

route.get("/", (request , response) => {
    return response.status(200).send({
        "name" : "John",
        "age" : "22",  
        "married" : true,
        "money" : true
    });
});

route.put("/", (request , response) => {
    return response.status(201).send({
        "message": "atualizado com sucesso"
    })
})

route.post("/", (request , response) => {
    return response.status(200).send({
        "message": "usuário criado com sucesso"
    })
})

route.delete("/", (request , response) => {
    return response.status(200).send({
        "message": "usuário deletado com sucesso"
    })
})

route.delete("/", (request , response) => {
    return response.status(200).send({
        "message": "usuário deletado com sucesso"
    })
})

export default route;