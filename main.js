let entrada = "55C"
let palavra = ""
let fields;
let total = 0

function total (entrada) {
    if (!isNaN(entrada))
        total += entrada
    return total
}

function enableField(total) {
    switch (total) {
        case total = 6:
            return ["A"];
        case total = 7:
            return ["A", "B"];
        case total >=8 :
            return ["A", "B", "C"];
        default:
            return [];
    }
}

function transicao () {

}

function main (entrada) {
    palavra += entrada;
    total (entrada);
    //tratar fields como conjunto
    fields = enableField(total);
    result = transicao(total)
    return result
}