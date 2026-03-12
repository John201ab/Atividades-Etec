import{promises as fs} from "fs";
import { json } from "stream/consumers";


//1_:
async function pegaDados() {
    const dados = JSON.parse (await fs.readFile("./times.json"))
    return dados;
}

//2_:
async function listTimes() {
    const dados = await pegaDados()

    const times = dados.forEach(times => {
        console.log(times.nome)
    });
}

//listTimes()

//3_:
async function listOrder(){
    const dados = await pegaDados()

    const times = dados.forEach(times => {
        if(times.detalhes.nome_oficial.startsWith("S"))
            console.log(times.detalhes.nome_oficial)
    })
}

// listOrder()

//4_:
async function sortEstadio(){
    const dados = await pegaDados()

    const estadio = dados.sort((estadio1, estadio2) =>{
      return estadio1.detalhes.estadio.nome.length - estadio2.detalhes.estadio.nome.length
    }).forEach(estadio => {
        console.log(estadio.detalhes.estadio.nome)
    })
    
}

// sortEstadio()

// 5_:

async function organizall(){
    const dados = await pegaDados()

    const info = dados.filter(infos =>{
        return infos.detalhes.localizacao.estado == "SP"
    }).map(infos =>{
        console.log(`"Nome Cidade: " ${infos.detalhes.localizacao.cidade}
"Nome Estadio: "  ${infos.detalhes.estadio.nome}
"Capacidade: " ${infos.detalhes.estadio.capacidade}
"=-=-=-=-=-=-=-=-=-"`)
        
    })

}
//organizall()

//6_: 

async function organizaRS(){
    const dados =  await pegaDados()
    
    const info = dados.filter(infos =>{

        if(infos.detalhes.localizacao.estado == "RS" && infos.nome.length > 7){
        console.log(`Nome do time:  ${infos.nome}`)
      }
    })
  
}

// organizaRS()

// 7_:

async function titulos(){
    const dados = await pegaDados()

    const info = dados.filter(infos => {
       console.log(`Time: ${infos.nome}  Titulos: ${infos.historico.principais_titulos}`)
    })

}

titulos()