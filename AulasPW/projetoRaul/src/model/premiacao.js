import { EntitySchema } from "typeorm";

//Criação de entidade User para o banco de dados
const premiacao = new EntitySchema({
    name: "Premiacao",
    tableName: "premiacao",
    columns: {
        id: {type: "int", primary: true, generated: "increment" },
        nomePremiacao: {type: "varchar", length: 30, nullable: false},
        valorPremiacao: {type: "decimal", nullable: false},
        createdAt: {type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deletedAT: {type: "datetime", nullable: true}
    },
});

export default premiacao;