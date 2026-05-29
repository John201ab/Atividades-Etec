import { EntitySchema } from "typeorm";

const genero = new EntitySchema({
  name: "genero",
  tableName: "genero",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    name: { type: "varchar", length: 60, nullable: false },
    createAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    deletedAt: { type: "datetime", nullable: true },
  },
});

export default genero;
