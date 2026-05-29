import { Entity } from "typeorm";
import { EntitySchema } from "typeorm/browser";

const user = new EntitySchema({
    name: "premiacao",
    table:"premiacao",
    columns:{
        id:{primary: true, type:"int", generated: "increment"},
        nome_premiacao:{type: "varchar", length: 30, nullable: true},
        valor_premiacao:{type:"decimal", nullable: true},
        created_at:{type: "datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        delete_at:{type:"datetime", nullable: true}
    }
});