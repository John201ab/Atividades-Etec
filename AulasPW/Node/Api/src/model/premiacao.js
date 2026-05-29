import { EntitySchema } from "typeorm";

const premiacao = new EntitySchema({
  name: "premiacao",
  tableName: "premiacao",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    name: { type: "varchar", length: 30, nullable: false },
    valor_premiacao: { type: "decimal", nullable: false },
    createAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    deletedAt: { type: "datetime", nullable: true },
  },
});

export default premiacao;
