import {promises as fs} from "fs";

async function pegaDados() {
    const dados = JSON.parse( await fs.readFile("./people.json"));
    return dados;
}

/*
Existem metados especificos para trabalhar com dados do tipo ARRAY.
Esses metados tem como objetivo auxiliar na manipulação dos dados e
em alguns dos metados, temos a possibilidade de criar novas variaveis 
apenas com informações necessarias.
Esses metados são:
- ForEach();
- Map();
- Filter();
- Find();
- Every();
- Some();
- Sort();
*/

/*FOREACH é um metado que vai percorrer o array e para cada interação dentro do array 
ele vai executar a logica que voce estabeler.
Esse metado sabe de forma automatiaca quando deve interromper a execução*/

function exemploForeach() {
    const dados = pegaDados();
    dados.forEach(pessoa =>  {
        console.log("")
    })

}


/*Map é um metado de array que vai permitir você criar uma nova variavel baseada apenas nos 
dados que você 
Esse método para ser utilizado precisa que tenha o return dentro da arrow function para que 
os  dados return para a variavel corresondente
*/

async function exeMap() {
    const dados = await pegaDados();
    
    const dadosLimpos = dados.map((pessoa) =>{
        return {
            "nomeCompleto": `${pessoa.nome.first} ${pessoa.nome.last}`,
            "idade": pessoa.dob.age,
            "email": pessoa.email
        }
        console.log(dadosLimpos)
    })
}

// exeMap();

/*Filter é um metado que vai permitir você filtrar todos os itens que corresponde a sua
clausula especificada e armazenar esse return em uma variavel.
*/

async function exeFilter() {
    const dados = pegaDados();

    const mais50 = dados.filter(pessoa =>{
        return pessoa.dob.age > 50 && pessoa.gender == "male"
    }).map((pessoa) =>{
        return {
            "nome": pessoa.name.first,
            "idade": pessoa.dob.age
        }
    })
    console.log(mais50)
}

// exeFilter();

/* FIND é um metado que vai retornar o primeiro dado que for encontrado que corresponder a 
logica que você passar. É parecido com o filter, a diferença é que o filter retorna todos e o 
fimd retorna o primeiro */

async function exeFind() {

    const dados = await pegaDados();

    const login = dados.find((pessoa) => {
        return pessoa.email == "helga.ramos@example.com" && pessoa.login.password == "sneakers"
    });
    console.log(login);
}

// exeFind()

/* O Métado EVERY vai percorrer o seu array e verificar se dentro dos dados TODOS SÃO
COMPATIVEL a logica que você informou;
Ele vai retornar um dado booleano para variavel que armazenará esse retorno */

async function exeEvery() {
    const dados = await pegaDados();

    const saoBrasileiros = dados.every((pessoa) => {
        return pessoa.nat == "BR"
    });

    if(saoBrasileiros) {
        console.log("Todos brasileiros")
    } else {
        console.log("Nem todos são brasileiros")
    }
}

// exeEvery()

/*O Métado SOME vai percorrer o seu array e verificar se dentro dos dados EXISTE ALGUM que 
seja compativel a logica que você informou.
Ele vai retornar um dado booleano para a variavel que armazenará esse retorno */

async function exeSome() {
    const dados = await pegaDados();

    const existeCearence = dados.some((pessoa) => {
        return pessoa.location.state == "Ceará"
    });
    console.log(existeCearence);
}

// exeSome();