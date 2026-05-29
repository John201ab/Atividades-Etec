import express from "express";
import { IsNull } from "typeorm";
import {AppDataSource} from "../database/config.js"
import userModel from "../model/user.js"

const route = express.Router();

const userTable = AppDataSource.getRepository(userModel);
route.get("/",async (request,response) =>{
    const selectedUsers = await userTable.findBy({deletedAt:
    IsNull()});
    return response.status(200).send({message: seletedUsers});
});

route.get("/:name", async (request, response) =>{
    const {name} = request.params;
    const selectedUsersByName = await userTable.findBy({name: (`%$name%`), deletedAt: IsNull()})

    if(selectedUsersByName.length <1){
        return response.status(204).end()
    }
    return response.status(200).send({message: selectedUsersByName});
});

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
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const typeUser = request.body.typeUser;
    console.log(name, email, password, typeUser)
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
