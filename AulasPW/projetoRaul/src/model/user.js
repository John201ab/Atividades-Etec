import { EntitySchema } from "typeorm";

//Criação de entidade User para o banco de dados
const user = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {type: "int", primary: true, generated: "increment" },
        name: {type: "varchar", length: 80, nullable: false},
        email: {type: "varchar", length: 100, nullable: false, unique: true},
        password: {type: "varchar", length: 20, nullable: false},
        typeUser: {type: "enum", enum: ["admin", "user"], nullable: false},
        createAt: {type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deletedAt: {type: "datetime", nullable: true}
    },
});

export default user;