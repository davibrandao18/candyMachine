let entrada = "";
//let palavra = ['5','5','B'];
let palavra = [];
const finais = [11,12,21,22,31,32];
let estadoInicial = 0;
let resultEstado =-1;
let total = 0;
let troco = 0;
let buttonsActive = [];

const matriz = [
    [-1, 1,2,5, 0,0,0],
    [-1, 2,3,6, 1,1,1],
    [-1, 3,4,7, 2,2,2],
    [-1, 4,5,8, 3,3,3],
    [-1, 5,6,9, 4,4,4],
    [-1, 6,7,9, 5,5,5],
    [-1, 7,8,9, 11,6,6],
    [-1, 8,9,9, 12,21,7],
    [-1, 9,9,9, 12,22,31],
    [-1, 9,9,9, 12,22,32]
]

//console.log("Resultado",transicao(palavra));
function main(entrada) {
    palavra = [...palavra,entrada];
    calcTotal(entrada);
    resultEstado = transicao(palavra);
    finais.includes(resultEstado)? calcTroco(resultEstado, total) : false;
}

function transicao(palavra) {
    let estado = estadoInicial;
    palavra.map(simbolo => {
        let position = !isNaN(simbolo)? parseInt(simbolo) : convertToNumber(simbolo);
        //console.log(`Position: ${position}`);
        //console.log(`Simbolo: ${simbolo}`);
        estado = (position === 5 && !isNaN(simbolo))? matriz[estado][3] : matriz[estado][position];
        //console.log(`matriz [${estado}][${position}]  = ${estado}`);
    });
    //console.log(`Estado: ${estado}`)
    return estado;
}

function enableButton(total) {
    if (total >= 6 && !buttonsActive.find(e => e == "A")) {
        document.getElementById("btnA").disabled = false;
        buttonsActive.push("A");
    } 
    if (total >= 7 && !buttonsActive.find(e => e == "B")) {
        document.getElementById("btnB").disabled = false;
        buttonsActive.push("B");
    }
    if (total >= 8 && !buttonsActive.find(e => e == "C")) {
        document.getElementById("btnC").disabled = false;
        buttonsActive.push("C");
    }
}

function disableButtons(){
    document.getElementById("btnA").disabled = true;
    document.getElementById("btnB").disabled = true;
    document.getElementById("btnC").disabled = true;
    // bloqueia money
    document.getElementById("cash1").disabled = true;
    document.getElementById("cash2").disabled = true;
    document.getElementById("cash5").disabled = true;
}

function convertToNumber(position){
    switch(position){
        case 'A':
            return 4
        case 'B':
            return 5
        case 'C':
            return 6
    }
}

function convertToCandy(numberCandy){
    switch(numberCandy){
        case 11:
            return 'A'
        case 12:
            return 'A'
        case 21:
            return 'B'
        case 22:
            return 'B'
        case 31:
            return 'C'
        case 32:
            return 'C'
    }
}

function calcTroco(resultEstado, total){
    let candy = convertToCandy(resultEstado);
    console.log(candy)
    switch (candy){
        case ('A'):
            troco = total - 6;
            break;
        case ('B'):
            troco = total - 7;
             break;
        case ('C'):
            troco = total - 8;
            break;
        default:
            console.log('err!')
        }
    document.getElementById("troco").innerHTML = `TROCO: R$ ${troco},00`;
    document.getElementById("troco").style.backgroundColor = `rgb(152, 243, 116)`;
    document.getElementById("candy").innerHTML = `${candy}`;
    document.getElementById("candy").style.backgroundColor = `rgb(152, 243, 116)`;
}

function calcTotal(entrada){
    if (!isNaN(entrada)) {
        total += entrada;
        total > 5 && enableButton(total);
        document.getElementById("total").innerHTML = `TOTAL: R$ ${total},00`;
    } else {
        disableButtons();
    }
}