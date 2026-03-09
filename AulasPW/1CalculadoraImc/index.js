import readline  from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface ({ input, output });

async function perguntar() {
    try {
        // entradas para digitar
        const peso = await rl.question('Qual seu peso? ');
        const altura = await rl.question('Qual sua altura? ');

        // calculo
        const imc = peso / (altura * altura);

        // mensagem de saida com os calculos convertidos em imc
        console.log(`Você tem ${altura} e seu peso é de ${peso}kg, se enquadra em ${imc.toFixed(2)}`);

        
        if (imc <= 16.9) {
            console.log('Você está muito abaixo do peso.');
        } else if ( imc <= 18.9) {
            console.log('Você está abaixo do peso.');
        } else if (imc <= 26.9){
            console.log('Você está com peso normal.');
        } else if (imc <= 31.9){
            console.log('Você está acima do peso.');
        } else if (imc <= 32){
            console.log('Você está com obesidade.');
        } else{
            console.log('Obesidade grau 1.');
        }

    } finally {
         rl.close();
        }
    }
   
perguntar();