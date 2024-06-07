let respostaAnterior = 0; // Ans - Answer
let primeiraAcao = false;

const divCalculadora = document.querySelector("div#calculadora");
let todasTeclas = document.querySelectorAll("button.tecla");
const divHistorico = document.querySelector("div#historico");
const buttonExcluirHistorico = document.querySelector("span#excluir-historico");
const spanAvisoNenhumCalculo = document.querySelector("span#aviso-nenhum-calculo");

let buttonApagarValorDoCalculo = document.querySelector("button#ac-ce");
let divRespostaAnterior = document.querySelector("div#resposta-anterior");


function acaoCalculadora(valorTecla) {
    if (primeiraAcao == false) {
        divRespostaAnterior.textContent = "Ans = " + respostaAnterior;
        buttonApagarValorDoCalculo.textContent = "CE";

        primeiraAcao = true;
    }

    let divResultadoCalculo = document.querySelector("div#resultado-calculo");
    let ultimoValorInserido = divResultadoCalculo.textContent.slice(-1);
    let penultimoValorInserido = divResultadoCalculo.textContent.slice(-2, -1);
    let preAntepenultimoValorInserido = divResultadoCalculo.textContent.slice(-4, -3);
    
    if (valorTecla != "Enter" || valorTecla != "="){
        buttonApagarValorDoCalculo.textContent = "CE";
    }
    // Para casos onde o ultimo valor é "NaN", "Infinity" ou "-Infinity"
    if (ultimoValorInserido == "N" || ultimoValorInserido == "y") {
        divResultadoCalculo.textContent = 0;
        divRespostaAnterior.textContent = "Ans = 0";
        respostaAnterior = 0;
    }

    switch (valorTecla) {
        case ",":
        case ".":
            if (valorTecla == ",") {
                valorTecla = ".";
            }
            
            let contadorDeEspacosVazios;
            let contadorDePontos = divResultadoCalculo.textContent.split(".").length - 1;

            if (ultimoValorInserido != " ") {
                if (divResultadoCalculo.textContent.split(" ").length - 1 == 0) {
                    contadorDeEspacosVazios = 1;
                }
                else {
                    contadorDeEspacosVazios = 1 + divResultadoCalculo.textContent.split(" ").length - 1;
                }
                    
                if (contadorDeEspacosVazios > 0 && contadorDeEspacosVazios > contadorDePontos && (ultimoValorInserido != "(" && ultimoValorInserido >= 0)) {
                    divResultadoCalculo.textContent += valorTecla;
                }
            }
            break;

        case "0":
            if (ultimoValorInserido == "y") {
                divResultadoCalculo.textContent += " " + valorTecla;
            }
            else if (ultimoValorInserido == " ") {
                divResultadoCalculo.textContent += valorTecla;
            }
            else if(divResultadoCalculo.textContent.split(" ").length - 1 == 0 && (divResultadoCalculo.textContent.includes(".") || divResultadoCalculo.textContent > 0)) {
                divResultadoCalculo.textContent += valorTecla;
            }
            else if (divResultadoCalculo.textContent.split(" ").length - 1 > 0 && (divResultadoCalculo.textContent.substring(divResultadoCalculo.textContent.lastIndexOf(" ") + 1).includes(".") || divResultadoCalculo.textContent.substring(divResultadoCalculo.textContent.lastIndexOf(" ") + 1) > 0)) {
                divResultadoCalculo.textContent += valorTecla;
            }
            break;

        case "+":
            if (divResultadoCalculo.textContent.length > 0 && ultimoValorInserido != "." && penultimoValorInserido != "+" && penultimoValorInserido != "-" && penultimoValorInserido != "x" && penultimoValorInserido != "/" && ultimoValorInserido != "(") {
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            else if (divResultadoCalculo.textContent.length > 0 && penultimoValorInserido == "-" && ultimoValorInserido != "(" && preAntepenultimoValorInserido != "(" && penultimoValorInserido != "-" && penultimoValorInserido != "/" && penultimoValorInserido != "x") {
                // Remove os últimos 3 caracteres
                divResultadoCalculo.textContent = divResultadoCalculo.textContent.substring(0, divResultadoCalculo.textContent.length - 3);
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            else if (ultimoValorInserido == "y") {
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            break;
        
        case "-":
            if (divResultadoCalculo.textContent.length == 1 && ultimoValorInserido == 0) {
                divResultadoCalculo.textContent = " " + valorTecla + " ";
            }
            else if (ultimoValorInserido != "." && penultimoValorInserido != "+" && penultimoValorInserido != "-") {
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            else if (penultimoValorInserido == "+") {
                divResultadoCalculo.textContent = divResultadoCalculo.textContent.substring(0, divResultadoCalculo.textContent.length - 3);
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            else if (ultimoValorInserido == "y") {
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            break;

        case "*":
        case "x":
        case "/":
            if (valorTecla == "*") {
                valorTecla = "x";
            }

            if (ultimoValorInserido != "." && divResultadoCalculo.textContent.length > 0 && penultimoValorInserido != "+" && penultimoValorInserido != "-" && penultimoValorInserido != "/" && penultimoValorInserido != "x" && ultimoValorInserido != "(") {
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            else if (divResultadoCalculo.textContent.length == 0) {
                divResultadoCalculo.textContent += "0 " + valorTecla + " ";
            }
            else if (ultimoValorInserido == "y") {
                divResultadoCalculo.textContent += " " + valorTecla + " ";
            }
            break;
        
        case "Ans":
            if (document.querySelector("div#resultado-calculo") == 0 && ultimoValorInserido != "." && (penultimoValorInserido == "+" || penultimoValorInserido == "-" || penultimoValorInserido == "x" || penultimoValorInserido == "/")) {
                divResultadoCalculo.textContent = valorTecla;
            }
            else if (ultimoValorInserido == "s") {
                divResultadoCalculo.textContent += " x " + valorTecla;
            }
            else if (ultimoValorInserido != "." && ultimoValorInserido != "(" && penultimoValorInserido != "+" && penultimoValorInserido != "-" && penultimoValorInserido != "x" && penultimoValorInserido != "/") {
                divResultadoCalculo.textContent += " x " + valorTecla;
            }
            else {
                divResultadoCalculo.textContent += valorTecla;
            }
            break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (((divResultadoCalculo.textContent.length == 1 && document.querySelector("div#resultado-calculo") == 0) && ultimoValorInserido != ".") || (divResultadoCalculo.textContent.length == 1 && ultimoValorInserido == 0)) {
                divResultadoCalculo.textContent = valorTecla;
            }
            else if (ultimoValorInserido != "s") {
                divResultadoCalculo.textContent += valorTecla;
            }    
            else {
                divResultadoCalculo.textContent += " x " + valorTecla;
            }
            break;

        case "(":
            if (divResultadoCalculo.textContent.length == 1 && ultimoValorInserido == 0) {
                divResultadoCalculo.textContent = "("
            }
            else if (penultimoValorInserido == "+" || penultimoValorInserido == "-" || penultimoValorInserido == "x" || penultimoValorInserido == "/") {
                divResultadoCalculo.textContent += " (";
            }
            else if ((!isNaN(ultimoValorInserido) && divResultadoCalculo.textContent != 0) || ultimoValorInserido == "s") {
                divResultadoCalculo.textContent += " x (";
            }
            break;
            
        case ")":
            var contadorDeAberturaDeParenteses = divResultadoCalculo.textContent.split("(").length - 1;
            var contadorDeFechamentoDeParenteses = divResultadoCalculo.textContent.split(")").length - 1;
            
            if (contadorDeAberturaDeParenteses > 0 && contadorDeAberturaDeParenteses > contadorDeFechamentoDeParenteses && (ultimoValorInserido != "(")) {
                divResultadoCalculo.textContent += ")";
            }
            break;

        case "AC":
            divResultadoCalculo.textContent = 0;
            divRespostaAnterior.textContent = "Ans = " + respostaAnterior;
            break;

        case "CE":
            if (ultimoValorInserido == "" || ultimoValorInserido == " " || ultimoValorInserido == "+" || ultimoValorInserido == "-" || ultimoValorInserido == "x" || ultimoValorInserido == "/" || ultimoValorInserido == "s" || ultimoValorInserido == "N") {
                divResultadoCalculo.textContent = divResultadoCalculo.textContent.substring(0, divResultadoCalculo.textContent.length - 3);
            }
            else if (ultimoValorInserido == "y") {
                divResultadoCalculo.textContent = divResultadoCalculo.textContent.substring(0, divResultadoCalculo.textContent.length - 8);
            }
            // Se o ultimo valor presente no resultado tiver um tamanho de caracteres maior que 12
            else if (divResultadoCalculo.textContent.split(" ")[divResultadoCalculo.textContent.split(" ").length - 1].includes("e")) {
                // Substitui o ultimo valor por ""
                divResultadoCalculo.textContent = divResultadoCalculo.textContent.replace(/\b\d+(\.\d+)?e[+-]?\d+\b\s*$/, "");
            }
            else {
                divResultadoCalculo.textContent = divResultadoCalculo.textContent.substring(0, divResultadoCalculo.textContent.length - 1);
            }                    

            if (divResultadoCalculo.textContent == "") {
                divResultadoCalculo.textContent = 0;
            }
            break;

        case "Enter":
        case "=":
            if (ultimoValorInserido != " " && ultimoValorInserido != "(") {
                if (divResultadoCalculo.textContent != 0) {
                    var contadorDeAberturaDeParenteses = divResultadoCalculo.textContent.split('(').length - 1;
                    var contadorDeFechamentoDeParenteses = divResultadoCalculo.textContent.split(')').length - 1;
                    
                    if (contadorDeAberturaDeParenteses > contadorDeFechamentoDeParenteses) {
                        contadorDeAberturaDeParenteses - contadorDeFechamentoDeParenteses;
                        for (i = 0; i < contadorDeAberturaDeParenteses; i++) {
                            divResultadoCalculo.textContent += ")";
                        }
                    }

                    var formulaDoCalculo = divResultadoCalculo.textContent;

                    divRespostaAnterior.textContent = formulaDoCalculo;
                    divResultadoCalculo.textContent = divResultadoCalculo.textContent.replace(/\s/g, "");
                    divResultadoCalculo.textContent = divResultadoCalculo.textContent.replace(/x/g, "*");
                    divResultadoCalculo.textContent = divResultadoCalculo.textContent.replace(/Ans/g, respostaAnterior);
                    divResultadoCalculo.textContent = divResultadoCalculo.textContent.replace(/(\d)\(/g, "$1*(");
                    
                    var resultadoDoCalculo = eval(divResultadoCalculo.textContent);
                    if (resultadoDoCalculo < 0) {
                        resultadoDoCalculo = resultadoDoCalculo.toString();
                        resultadoDoCalculo = resultadoDoCalculo.slice(0, 1) + ' ' + resultadoDoCalculo.slice(1);
                    }

                    // Atualizando os valores..
                    ultimoValorInserido = divResultadoCalculo.textContent.slice(-1);
                    penultimoValorInserido = divResultadoCalculo.textContent.slice(-2, -1);

                    divResultadoCalculo.textContent = resultadoDoCalculo;
                    if (divResultadoCalculo.textContent != "") respostaAnterior = resultadoDoCalculo;

                    if (formulaDoCalculo.indexOf("+") > -1 || formulaDoCalculo.indexOf("-") > -1 || formulaDoCalculo.indexOf("x") > -1 || formulaDoCalculo.indexOf("/") > -1) {
                        if (!spanAvisoNenhumCalculo.classList.contains("d-none"))
                            spanAvisoNenhumCalculo.classList.add("d-none");
                        
                        if (resultadoDoCalculo.toString().length > 12)
                            resultadoDoCalculo = parseFloat(resultadoDoCalculo).toExponential();
                        
                        var divResultado = document.createElement("div");
                        divResultado.onclick = function() {
                            if (!isNaN(resultadoDoCalculo) && resultadoDoCalculo != "Infinity" && resultadoDoCalculo != "-Infinity") {    
                                if (divResultadoCalculo.textContent.split(" ").length - 1 > 1) {
                                    if (eval(resultadoDoCalculo) < 0) {
                                        divResultadoCalculo.textContent += " (" + resultadoDoCalculo + ")";
                                    }
                                    else if (divResultadoCalculo.textContent.slice(-1) == " " || divResultadoCalculo.textContent.substring(divResultadoCalculo.textContent.lastIndexOf(" ") + 1).includes(".") || divResultadoCalculo.textContent.substring(divResultadoCalculo.textContent.lastIndexOf(" ") + 1) > 0) {
                                        divResultadoCalculo.textContent += resultadoDoCalculo;
                                    }
                                }
                                else if (ultimoValorInserido == "(") {
                                    divResultadoCalculo.textContent += resultadoDoCalculo;
                                }
                                else {
                                    divResultadoCalculo.textContent = resultadoDoCalculo;
                                }

                            }
                        }

                        divResultado.classList.add("calculo-registrado", "pe-2", "ps-2");
                        divResultado.textContent = formulaDoCalculo + " = " + resultadoDoCalculo;

                        document.querySelector("main#historico").appendChild(divResultado);
                        document.querySelector("main#historico").scrollTop = document.querySelector("main#historico").scrollHeight;

                        divRespostaAnterior.textContent = "Ans = " + respostaAnterior;
                        buttonApagarValorDoCalculo.textContent = "AC";
                    }
                    else {
                        divRespostaAnterior.textContent = "Ans = " + respostaAnterior;
                        buttonApagarValorDoCalculo.textContent = "CE";
                    }
                }
            }
            break;
    }

    // Ajusta o div#container-formula e div#container-resultado para que o conteúdo seja exibido corretamente da direita para esquerda
    document.querySelector("div#container-resposta-anterior").scrollLeft = document.querySelector("div#resposta-anterior").offsetWidth;
    document.querySelector("div#container-resultado-calculo").scrollLeft = document.querySelector("div#resultado-calculo").offsetWidth;
}

todasTeclas.forEach(function(tecla) {
    tecla.onclick = function() {
        let textoDaTecla = tecla.textContent;
        acaoCalculadora(textoDaTecla);
    }
});

buttonExcluirHistorico.onclick = function() {
    excluirHistoricoDeCalculos();
}

document.addEventListener("keydown", function(event) {
    let teclaPressionada = event.key.toString();

    if (!isNaN(teclaPressionada) || teclaPressionada == "x" || teclaPressionada == "*" || teclaPressionada == "(" || teclaPressionada == ")" || teclaPressionada == "-" || teclaPressionada == "+" || teclaPressionada == "=" || teclaPressionada == "/" || teclaPressionada == "." || teclaPressionada == "," || teclaPressionada == "Enter" || teclaPressionada == "NumpadEnter") {
        if (teclaPressionada == "Enter" || teclaPressionada == "NumpadEnter") {
            event.preventDefault();
        }

        acaoCalculadora(teclaPressionada);
    }
    else if (teclaPressionada == "Backspace") {
        acaoCalculadora(apagarValorDoCalculo.textContent);
    }
});

function excluirHistoricoDeCalculos() {
    let todosCalculosRegistrados = document.querySelectorAll("div.calculo-registrado");
    if (todosCalculosRegistrados.length > 0) {
        todosCalculosRegistrados.forEach(function(boxResult) {
            boxResult.remove();
        });

        spanAvisoNenhumCalculo.classList.remove("d-none");
    }
}

function redimensionarTela() {
    let larguraDaPagina = document.body.clientWidth;

    if (larguraDaPagina <= 1024) {
        divCalculadora.classList.add("mb-4");

        if (divCalculadora.classList.contains("col-6")) {
            divCalculadora.classList.remove("col-6");
            divCalculadora.classList.remove("ps-0");
            divCalculadora.classList.remove("pe-3");

            divHistorico.classList.remove("col-6");
            divHistorico.classList.remove("ps-3");
            divHistorico.classList.remove("pe-0");
        }

        divCalculadora.classList.add("col-12");
        divHistorico.classList.add("col-12");
    }
    else {
        if (divCalculadora.classList.contains("mb-4")) {
            divCalculadora.classList.remove("mb-4");
            divCalculadora.classList.remove("col-12");
            divHistorico.classList.remove("col-12");
        }

        divCalculadora.classList.add("col-6");
        divCalculadora.classList.add("ps-0");
        divCalculadora.classList.add("pe-3");
        
        divHistorico.classList.add("col-6");
        divHistorico.classList.add("ps-3");
        divHistorico.classList.add("pe-0");
    }
}

redimensionarTela();
window.addEventListener("resize", function() {
    redimensionarTela();
});
