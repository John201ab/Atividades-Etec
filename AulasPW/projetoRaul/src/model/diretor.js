import { EntitySchema } from "typeorm";

//Criação de entidade User para o banco de dados
const diretor = new EntitySchema({
    name: "Diretor",
    tableName: "diretor",
    columns: {
        id: {type: "int", primary: true, generated: "increment" },
        nomeDiretor: {type: "varchar", length: 80, nullable: false},
        sexo: {type: "enum", enum: ["masculino", "feminino"], nullable: false},
        dataDeNascimento: {type: "datetime", nullable: false},
        nacionalidade: {type: "varchar", length: 50, nullable: false},
        fotoDiretor: {type: "varchar", length: 80, nullable: true},
        createdAt: {type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deletedAT: {type: "datetime", nullable: true}
    },
});

export default diretor;