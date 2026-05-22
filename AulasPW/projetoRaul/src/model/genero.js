import { EntitySchema } from "typeorm";

//Criação de entidade User para o banco de dados
const genero = new EntitySchema({
    name: "Genero",
    tableName: "genero",
    columns: {
        id: {type: "int", primary: true, generated: "increment" },
        nomeGenero: {type: "varchar", length: 80, nullable: false},
        createdAt: {type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deletedAT: {type: "datetime", nullable: true}
    },
});

export default genero;