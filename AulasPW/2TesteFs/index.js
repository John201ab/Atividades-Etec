import{promises as fs} from "fs";
async function pegadados(){
    const dados = JSON.parse( await fs.readFile("./people.json"));
    
    console.log(dados);
    
}

pegadados()