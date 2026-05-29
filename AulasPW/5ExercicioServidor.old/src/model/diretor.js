import { EntitySchema } from "typeorm";

const user = new EntitySchema({
    name:"diretor",
    tableName: "diretor",
    columns:{
        id:{primary: true, type: "int", generated: "increment"},
        nome_diretor:{type: "varchar", length: 60, nullable: false},
        sexo:{type: "enum", enum: ['feminino','masculino'], nullable: false},
        data_nascimento:{type: "datetime", nullable: false},
        nacionalidade:{type:"varchar", length: 50, nullable: false},
        foto_diretor:{type:"varchar", length: 80, nullable:true},
        created_at:{type:"datetime", default: () => "CURRENT_TIMESTAMP", nullable: false},
        deleted_at:{type:"datetime", nullable: true}
    }
});