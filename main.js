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
        document.getElementById("btnDentadura").disabled = false;
        document.getElementById("btnDentadura").style.cursor = "pointer";
        document.getElementById("btnA").style.backgroundColor= "#47A83E";
        buttonsActive.push("A");
    } 
    if (total >= 7 && !buttonsActive.find(e => e == "B")) {
        document.getElementById("btnMms").disabled = false;
        document.getElementById("btnMms").style.cursor = "pointer";
        document.getElementById("btnB").style.backgroundColor= "#47A83E";
        buttonsActive.push("B");
    }
    if (total >= 8 && !buttonsActive.find(e => e == "C")) {
        document.getElementById("btnAmora").disabled = false;
        document.getElementById("btnAmora").style.cursor = "pointer";
        document.getElementById("btnC").style.backgroundColor= "#47A83E";
        buttonsActive.push("C");
    }
}

function disableButtons(){
    document.getElementById("btnA").style.backgroundColor="#0D5F00";
    document.getElementById("btnDentadura").style.cursor = "auto";
    document.getElementById("btnB").style.backgroundColor="#0D5F00";
    document.getElementById("btnMms").style.cursor = "auto";
    document.getElementById("btnC").style.backgroundColor="#0D5F00";
    document.getElementById("btnAmora").style.cursor = "auto";
    // disable money
    document.getElementById("money1").disabled = true;
    document.getElementById("money1").style.backgroundColor="#0D5F00";
    document.getElementById("money1").style.cursor = "auto";
    document.getElementById("money2").disabled = true;
    document.getElementById("money2").style.backgroundColor="#0D5F00";
    document.getElementById("money2").style.cursor = "auto";
    document.getElementById("money3").disabled = true;
    document.getElementById("money3").style.backgroundColor="#0D5F00";
    document.getElementById("money3").style.cursor = "auto";
    // enable refresh
    //document.getElementById("refresh-view").style.display = "flex";
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
    
    document.getElementById("total").innerHTML = `Total: R$ ${total},00`;
    document.getElementById("valor").innerHTML = `Valor: - R$ ${total-troco},00`;
    document.getElementById("troco").innerHTML = `Troco: R$ ${troco},00`;
    document.getElementById("cash-back-money").style.color = "#827F9D";
    document.getElementById("without-money").style.display = "none";
    document.getElementById("with-money").style.width = "82px";

    let id = candy == 'A' ? "dentadura" : candy == 'B' ? "mms" : "amora";
    document.getElementById(id).style.width = "90px";
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
    // enable refresh
    document.getElementById("refresh-view").style.display = "none";
}