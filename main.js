let entrada = "";
let palavra = "";
let total = 0;
let troco = 0;
let buttonsActive = [];

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

function transicao(palavra, entrada) {
    switch (entrada){
        case'A':
            troco = total - 6;
            break;
        case'B':
            troco = total - 7;
             break;
        case'C':
            troco = total - 8;
            break;
        default:
            console.log('err!')
        }
    document.getElementById("troco").innerHTML = `TROCO: R$ ${troco},00`;
    document.getElementById("troco").style.backgroundColor = `rgb(152, 243, 116)`;
    document.getElementById("candy").innerHTML = `${entrada}`;
    document.getElementById("candy").style.backgroundColor = `rgb(152, 243, 116)`;
    }

function main(entrada) {
    palavra += entrada;
    if (!isNaN(entrada)) {
        total += entrada;
        total > 5 && enableButton(total);
        document.getElementById("total").innerHTML = `TOTAL: R$ ${total},00`;
    } else {
        disableButtons();
        transicao(palavra, entrada);
    }
}