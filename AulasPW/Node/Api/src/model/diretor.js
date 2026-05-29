import { EntitySchema } from "typeorm";

const diretor = new EntitySchema({
name: "diretor",
tableName: "diretor",
columns: {
    id: { primary: true, type: "int", generated: "increment" },
    name: { type: "varchar", length: 60, nullable: false },
    sexo: { type: "enum", enum: ["female", "male"], nullable: false },
    data_nascimento: { type: "varchar",length: 10, nullable: false },
    nacionalidade: { type: "varchar", length: 50, nullable: false },
    foto_diretor: { type: "varchar", length: 80 },
    createAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    deletedAt: { type: "datetime", nullable: true },
},
});

export default diretor;
