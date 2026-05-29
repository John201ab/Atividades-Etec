import { Entity, Generated } from "typeorm";

const user = new Entity({
    name:"genero",
    tablename: "genero",
    columns:{
        id:{primary: true, type: "int", Generated:"increment"},
        nome_genero:{type:"varchar", length: 60, nullable: false},
        created_at:{type:"datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deleted_at:{type:"datetime", nullable: true }
        }
});