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
        estado = (position === 5 && !isNaN(simbolo))? matriz[estado][3] : matriz[estado][position];
    });
    return estado;
}

function enableButton(total) {
    if (total >= 6 && !buttonsActive.find(e => e == "A")) {
        document.getElementById("btnA").disabled = false;
        document.getElementById("btnA").style.cursor = "pointer";
        buttonsActive.push("A");
    } 
    if (total >= 7 && !buttonsActive.find(e => e == "B")) {
        document.getElementById("btnB").disabled = false;
        document.getElementById("btnB").style.cursor = "pointer";
        buttonsActive.push("B");
    }
    if (total >= 8 && !buttonsActive.find(e => e == "C")) {
        document.getElementById("btnC").disabled = false;
        document.getElementById("btnC").style.cursor = "pointer";
        buttonsActive.push("C");
    }
}

function disableButtons(){
    document.getElementById("btnA").style.display = "none";
    document.getElementById("btnB").style.display = "none";
    document.getElementById("btnC").style.display = "none";
    // disable money
    document.getElementById("cash1").style.display = "none";
    document.getElementById("cash2").style.display = "none";
    document.getElementById("cash5").style.display = "none";
    // enable refresh
    document.getElementById("refresh-view").style.display = "flex";
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
    
    document.getElementById("total").innerHTML = `Total: R$ ${total},00<br>DOCE ${candy}: R$ -${total-troco},00`;
    document.getElementById("total").style.backgroundColor = `#FFFF52`;
    document.getElementById("troco").innerHTML = `Troco: R$ ${troco},00`;
    document.getElementById("troco").style.backgroundColor = `#228B22`;
    document.getElementById("troco").style.color = `#F9F9F9`;
    document.getElementById("candy").innerHTML = `${candy}`;
    document.getElementById("candy").style.backgroundColor = candy == 'A' ? "#12CEFA" : candy == 'B' ? "#FFA500" : "#DDA0DD";
}

function calcTotal(entrada){
    if (!isNaN(entrada)) {
        total += entrada;
        total > 5 && enableButton(total);
        document.getElementById("total").innerHTML = `Total: R$ ${total},00`;
    } else {
        disableButtons();
    }
}

function clean(){
    entrada = "";
    palavra = [];
    estadoInicial = 0;
    resultEstado = -1;
    total = 0;
    troco = 0;
    buttonsActive = [];

    document.getElementById("total").innerHTML = `Total: R$ 0,00`;
    document.getElementById("total").style.backgroundColor = `#F9F9F9`;
    document.getElementById("troco").innerHTML = `Troco: R$ 0,00`;
    document.getElementById("troco").style.backgroundColor = `#F9F9F9`;
    document.getElementById("troco").style.color = `#000`;
    document.getElementById("candy").innerHTML = ``;
    document.getElementById("candy").style.backgroundColor = "#F9F9F9";

    document.getElementById("btnA").disabled = true;
    document.getElementById("btnA").style.display = "";
    document.getElementById("btnA").style.cursor = "auto";
    document.getElementById("btnB").disabled = true;
    document.getElementById("btnB").style.display = "";
    document.getElementById("btnB").style.cursor = "auto";
    document.getElementById("btnC").disabled = true;
    document.getElementById("btnC").style.display = "";
    document.getElementById("btnC").style.cursor = "auto";

    // disable money
    document.getElementById("cash1").style.display = "";
    document.getElementById("cash2").style.display = "";
    document.getElementById("cash5").style.display = "";
    // enable refresh
    document.getElementById("refresh-view").style.display = "none";
}