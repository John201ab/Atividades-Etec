import { EntitySchema } from "typeorm";

//Criação de entidade User para o banco de dados
const autor = new EntitySchema({
    name: "Autor",
    tableName: "autor",
    columns: {
        id: {type: "int", primary: true, generated: "increment" },
        nomeAutor: {type: "varchar", length: 80, nullable: false},
        sexo: {type: "enum", enum: ["masculino", "feminino"], nullable: false},
        dataDeNascimento: {type: "datetime", nullable: false},
        nacionalidade: {type: "varchar", length: 50, nullable: false},
        fotoAutor: {type: "varchar", length: 80, nullable: true},
        createdAt: {type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deletedAT: {type: "datetime", nullable: true}
    },
});

export default autor;