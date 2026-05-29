import { EntitySchema } from "typeorm";

const user = new EntitySchema({
  name: "user",
  tableName: "user",
  columns: {
    id: { primary: true, type: "int", generated: "increment" },
    name: { type: "varchar", length: 80, nullable: false },
    email: { type: "varchar", length: 100, nullable: false, unique: true },
    password: { type: "varchar", length: 20, nullable: false },
    typeUser: { type: "enum", enum: ["admin", "comum"], nullable: false },
    createAt: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    deletedAt: { type: "datetime", nullable: true },
  },
});
export default user;
