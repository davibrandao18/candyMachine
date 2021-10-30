let entrada = "";
let palavra = "";
let total = 0;
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

function transicao() {

}

function main(entrada) {
    palavra += entrada;
    if (!isNaN(entrada)) {
        total += entrada;
        total > 5 && enableButton(total);
        document.getElementById("total").innerHTML = `TOTAL: R$ ${total},00`;
    }
    else {
        document.getElementById("btnA").disabled = true;
        document.getElementById("btnB").disabled = true;
        document.getElementById("btnC").disabled = true;
        // transicao(palavra)
    }
}