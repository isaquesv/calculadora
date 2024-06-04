// Função responsável por excluir todos os cálculos salvos no histórico
function excluirHistorico() {
    // Se existir um ou mais cálculos salvos no histórico todos serão removidos
    if (document.querySelectorAll(".calculo-registrado").length > 0) {
        document.querySelectorAll(".calculo-registrado").forEach(function(boxResult) {
            boxResult.remove();
        });

        // E o aviso volta a ser exibido
        if (document.querySelector("#aviso").classList.contains("d-none"))
            document.querySelector("#aviso").classList.remove("d-none");
    }
}

// Função responsável por gerenciar as ações da calculadora
function acaoCalculadora(valorTecla) {
    // Se essa for a primeira ação da calculadora..
    if (contador == 0) {
        document.querySelector("#formula").textContent = "Ans = " + answer;
        document.querySelector("#ac-ce").textContent = "CE";

        contador++;
    }

    var resultado = document.querySelector("#resultado");
    var ultimoValorInserido = resultado.textContent.slice(-1);
    var contadorDeEspacosVazios;
    
    // se valorTecla for diferente de "Enter" ou "=" o textContent de button#ac-ce é alterado 
    if (valorTecla != "Enter" || valorTecla != "=")
        document.querySelector("#ac-ce").textContent = "CE";

    switch (valorTecla) {
        // caso valorTecla for "," ou "."..
        case ",":
        case ".":
            // se valorTecla for "," é substituido por "."
            if (valorTecla === ",") valorTecla = ".";

            // se o ultimo caractere presente no textContent de div#resultado não for vazio..
            if (resultado.textContent.slice(-1) !== " ") {
                (resultado.textContent.split(' ').length - 1 == 0) ? contadorDeEspacosVazios = 1: contadorDeEspacosVazios = 1 + resultado.textContent.split(' ').length - 1;
                // IF(?) -> Se não existirem espaços vazios contadorDeEspacosVazios = 1 | ELSE(:) -> Se existerem espaços vazios contadorDeEspacosVazios = 1 + a quantidade de espaços vazios
                    
                var contadorDePontos = resultado.textContent.split('.').length - 1;
                if (contadorDeEspacosVazios > 0 && contadorDeEspacosVazios > contadorDePontos && (ultimoValorInserido != "(" && ultimoValorInserido >= 0))
                    resultado.textContent += valorTecla;
            }
            break;

        // caso valorTecla for "0"..
        case "0":
            // se o ultimo caractere presente no textContent de div#resultado for "y", para casos do resultado ser "Infinity" ou "-Infinity"
            if (resultado.textContent.slice(-1) === "y")
                resultado.textContent += " " + valorTecla;
            else if (resultado.textContent.length > 1 || resultado.textContent != 0 || resultado.textContent == "")
                resultado.textContent += valorTecla;            
            break;

        // caso valorTecla for "+"..
        case "+":
            if (resultado.textContent.length > 0 && resultado.textContent.slice(-1) !== "." && resultado.textContent.slice(-2, -1) !== "+" && resultado.textContent.slice(-2, -1) !== "-" && resultado.textContent.slice(-2, -1) !== "x" && resultado.textContent.slice(-2, -1) !== "/" && resultado.textContent.slice(-1) !== "(")
                resultado.textContent += " " + valorTecla + " ";
            else if (resultado.textContent.length > 0 && resultado.textContent.slice(-2, -1) === "-" && resultado.textContent.slice(-1) !== "(" && resultado.textContent.slice(-4, -3) !== "(" && resultado.textContent.slice(-2, -1) !== "-" && resultado.textContent.slice(-2, -1) !== "/" && resultado.textContent.slice(-2, -1) !== "x") {
                resultado.textContent = resultado.textContent.substring(0, resultado.textContent.length - 3);
                resultado.textContent += " " + valorTecla + " ";
            }
            else if (resultado.textContent.slice(-1) === "y")
                resultado.textContent += " " + valorTecla + " ";

            break;
        
        // caso valorTecla for "-"..
        case "-":
            if (resultado.textContent.length == 1 && ultimoValorInserido == 0)
                resultado.textContent = " " + valorTecla + " ";
            else if (resultado.textContent.slice(-1) !== "." && resultado.textContent.slice(-2, -1) !== "+" && resultado.textContent.slice(-2, -1) !== "-")
                resultado.textContent += " " + valorTecla + " ";
            else if (resultado.textContent.slice(-2, -1) === "+") {
                resultado.textContent = resultado.textContent.substring(0, resultado.textContent.length - 3);
                resultado.textContent += " " + valorTecla + " ";
            }
            else if (resultado.textContent.slice(-1) === "y")
                resultado.textContent += " " + valorTecla + " ";

            break;

        // caso valorTecla for "*", "x" ou "/"..
        case "*":
        case "x":
        case "/":
            if (valorTecla === "*") valorTecla = "x";

            if (resultado.textContent.slice(-1) !== "." && resultado.textContent.length > 0 && resultado.textContent.slice(-2, -1) !== "+" && resultado.textContent.slice(-2, -1) !== "-" && resultado.textContent.slice(-2, -1) !== "/" && resultado.textContent.slice(-2, -1) !== "x" && resultado.textContent.slice(-1) !== "(")
                resultado.textContent += " " + valorTecla + " ";
            else if (resultado.textContent.length == 0)
                resultado.textContent += "0 " + valorTecla + " ";
            else if (resultado.textContent.slice(-1) === "y")
                resultado.textContent += " " + valorTecla + " ";
            break;
        
        // caso valorTecla for "Ans"..
        case "Ans":
            if (resultado == 0 && ultimoValorInserido != "." && (resultado.textContent.slice(-2, -1) === "+" || resultado.textContent.slice(-2, -1) === "-" || resultado.textContent.slice(-2, -1) === "x" || resultado.textContent.slice(-2, -1) === "/"))
                resultado.textContent = valorTecla;
            else if (ultimoValorInserido == "s")
                resultado.textContent += " x " + valorTecla;
            else if (ultimoValorInserido != "." && ultimoValorInserido != "(" && resultado.textContent.slice(-2, -1) !== "+" && resultado.textContent.slice(-2, -1) !== "-" && resultado.textContent.slice(-2, -1) !== "x" && resultado.textContent.slice(-2, -1) !== "/")
                resultado.textContent += " x " + valorTecla;
            else
                resultado.textContent += valorTecla;
            break;

        // caso valorTecla for "1", "2", "3", "4", "5", "6", "7", "8" ou "9"..
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            if (((resultado.textContent.length == 1 && resultado == 0) && ultimoValorInserido != ".") || (resultado.textContent.length == 1 && ultimoValorInserido == 0))
                resultado.textContent = valorTecla;
            else if (ultimoValorInserido != "s")
                resultado.textContent += valorTecla;    
            else
                resultado.textContent += " x " + valorTecla;    
            
            break;

        // caso valorTecla for "("..
        case "(":
            if (resultado.textContent.length == 1 && ultimoValorInserido == 0) {
                resultado.textContent = "("
            }
            else if (resultado.textContent.slice(-2, -1) == "+" || resultado.textContent.slice(-2, -1) == "-" || resultado.textContent.slice(-2, -1) == "x" || resultado.textContent.slice(-2, -1) == "/") {
                resultado.textContent += " (";
            }
            else if ((!isNaN(ultimoValorInserido) && resultado.textContent != 0) || resultado.textContent.slice(-1) == "s") {
                resultado.textContent += " x (";
            }
            break;
            
        // caso valorTecla for ")"..
        case ")":
            var contadorDeAberturaDeParenteses = resultado.textContent.split('(').length - 1;
            var contadorDeFechamentoDeParenteses = resultado.textContent.split(')').length - 1;
            
            if (contadorDeAberturaDeParenteses > 0 && contadorDeAberturaDeParenteses > contadorDeFechamentoDeParenteses && (ultimoValorInserido != "("))
                resultado.textContent += ")";
            break;

        // caso valorTecla for "AC"..
        case "AC":
            resultado.textContent = 0;
            document.querySelector("#formula").textContent = "Ans = " + answer;
            break;

        // caso valorTecla for "CE"..
        case "CE":
            if (resultado.textContent.slice(-1) == "" || resultado.textContent.slice(-1) == " " || resultado.textContent.slice(-1) == "+" || resultado.textContent.slice(-1) == "-" || resultado.textContent.slice(-1) == "x" || resultado.textContent.slice(-1) == "/" || ultimoValorInserido == "s")
                resultado.textContent = resultado.textContent.substring(0, resultado.textContent.length - 3);
            else if (resultado.textContent.slice(-1) == "y")
                resultado.textContent = resultado.textContent.substring(0, resultado.textContent.length - 8);
            // Se o ultimo valor presente no resultado tiver um tamanho, de caracteres, maior que 12
            else if (resultado.textContent.split(" ")[resultado.textContent.split(" ").length - 1].includes('e'))
                resultado.textContent = resultado.textContent.replace(/\b\d+(\.\d+)?e[+-]?\d+\b\s*$/, '');
            else
                resultado.textContent = resultado.textContent.substring(0, resultado.textContent.length - 1);                    

            if (resultado.textContent == "") resultado.textContent = 0;
            break;

        // caso valorTecla for "Enter" ou "="..
        case "Enter":
        case "=":
            if (resultado.textContent.slice(-1) !== " " && resultado.textContent.slice(-1) !== "(") {
                if (resultado.textContent != 0) {
                    var contadorDeAberturaDeParenteses = resultado.textContent.split('(').length - 1;
                    var contadorDeFechamentoDeParenteses = resultado.textContent.split(')').length - 1;
                    
                    if (contadorDeAberturaDeParenteses > contadorDeFechamentoDeParenteses) {
                        contadorDeAberturaDeParenteses - contadorDeFechamentoDeParenteses;
                        for (i = 0; i < contadorDeAberturaDeParenteses; i++) {
                            resultado.textContent += ")";
                        }
                    }

                    var formulaDoCalculo = resultado.textContent;

                    document.querySelector("#formula").textContent = formulaDoCalculo;
                    resultado.textContent = resultado.textContent.replace(/\s/g, "");
                    resultado.textContent = resultado.textContent.replace(/x/g, "*");
                    resultado.textContent = resultado.textContent.replace(/Ans/g, answer);
                    resultado.textContent = resultado.textContent.replace(/(\d)\(/g, "$1*(");
                    
                    var resultadoDoCalculo = eval(resultado.textContent);
                    if (resultadoDoCalculo < 0) {
                        resultadoDoCalculo = resultadoDoCalculo.toString();
                        resultadoDoCalculo = resultadoDoCalculo.slice(0, 1) + ' ' + resultadoDoCalculo.slice(1);
                    }

                    resultado.textContent = resultadoDoCalculo;
                    if (resultado.textContent != "") answer = resultadoDoCalculo;

                    if (formulaDoCalculo.indexOf("+") > -1 || formulaDoCalculo.indexOf("-") > -1 || formulaDoCalculo.indexOf("x") > -1 || formulaDoCalculo.indexOf("/") > -1) {
                        if (!document.querySelector("#aviso").classList.contains("d-none"))
                            document.querySelector("#aviso").classList.add("d-none");
                        
                        if (resultadoDoCalculo.toString().length > 12)
                            resultadoDoCalculo = parseFloat(resultadoDoCalculo).toExponential();
                        
                        var divResultado = document.createElement("div");
                        divResultado.onclick = function() {
                            if (resultadoDoCalculo != "Infinity" && resultadoDoCalculo != "-Infinity") {
                                
                                if (resultado.textContent.split(' ').length - 1 > 1) {
                                    if (eval(resultadoDoCalculo) < 0)
                                        resultado.textContent += " (" + resultadoDoCalculo + ")";
                                    else if (resultado.textContent.slice(-2, -1) !== "+" || resultado.textContent.slice(-2, -1) !== "-" || resultado.textContent.slice(-2, -1) !== "x" || resultado.textContent.slice(-2, -1) !== "/")
                                        resultado.textContent += resultadoDoCalculo;
                                }
                                else if (resultado.textContent.slice(-1) == "(") {
                                    resultado.textContent += resultadoDoCalculo;
                                }
                                else {
                                    resultado.textContent = resultadoDoCalculo;
                                }

                            }
                        }

                        divResultado.classList.add("calculo-registrado", "pe-2", "ps-2");
                        divResultado.textContent = formulaDoCalculo + " = " + resultadoDoCalculo;

                        document.querySelector("#main").appendChild(divResultado);
                        document.querySelector("#main").scrollTop = document.querySelector("#main").scrollHeight;

                        document.querySelector("#formula").textContent = "Ans = " + answer;
                        document.querySelector("#ac-ce").textContent = "AC";
                    }
                    else {
                        document.querySelector("#formula").textContent = "Ans = " + answer;
                        document.querySelector("#ac-ce").textContent = "CE";
                    }
                }
            }
            break;
    }

    // Ajusta o div#container-formula e div#container-resultado para que o conteúdo seja exibido corretamente da direita para esquerda
    document.getElementById("container-formula").scrollLeft = document.getElementById("formula").offsetWidth;
    document.getElementById("container-resultado").scrollLeft = document.getElementById("resultado").offsetWidth;
}

// Função responsável por ajustar os elementos presentes no body
function resize() {
    if (document.body.clientWidth <= 1024) {
        document.querySelector("#calculadora").classList.add("mb-4");

        if (document.querySelector("#calculadora").classList.contains("col-6")) {
            document.querySelector("#calculadora").classList.remove("col-6");
            document.querySelector("#calculadora").classList.remove("ps-0");
            document.querySelector("#calculadora").classList.remove("pe-3");
            document.querySelector("#historico").classList.remove("col-6");
            document.querySelector("#historico").classList.remove("ps-3");
            document.querySelector("#historico").classList.remove("pe-0");
        }

        document.querySelector("#calculadora").classList.add("col-12");
        document.querySelector("#historico").classList.add("col-12");
    
    } else {    
        if (document.querySelector("#calculadora").classList.contains("mb-4")) {
            document.querySelector("#calculadora").classList.remove("mb-4");
            document.querySelector("#calculadora").classList.remove("col-12");
            document.querySelector("#historico").classList.remove("col-12");
        }

        document.querySelector("#calculadora").classList.add("col-6");
        document.querySelector("#calculadora").classList.add("ps-0");
        document.querySelector("#calculadora").classList.add("pe-3");
        
        document.querySelector("#historico").classList.add("col-6");
        document.querySelector("#historico").classList.add("ps-3");
        document.querySelector("#historico").classList.add("pe-0");

    }
}


var answer = 0;
var contador = 0;

resize();
// Caso as medidas da tela sejam alteradas a função resize é executada
window.addEventListener("resize", function() {
    resize();
});

// Atribuindo a função acaoCalculadora aos elementos button.tecla e passando seu respectivo texto como parâmetro 
document.querySelectorAll(".tecla").forEach(function(tecla) {
    tecla.onclick = function() {
        acaoCalculadora(tecla.textContent);
    }
});

// Atribuindo a função excluirHistorico ao elemento span#excluirHistorico
document.querySelector("#excluirHistorico").onclick = function() {
    excluirHistorico();
}

// Quando uma tecla é pressionada..
document.addEventListener("keydown", function(event) {
    // Se o evento da tecla for um número, ou "*", ou "(", ou ")", ou "-", ou "+", ou "=", ou "/", ou ".", ou ",", ou "Enter"..
    if (!isNaN(event.key)  || event.key == "x" || event.key == "*" || event.key == "(" || event.key == ")" || event.key == "-" || event.key == "+" || event.key == "=" || event.key == "/" || event.key == "." || event.key == ",")
        acaoCalculadora(event.key.toString());
    else if (event.key == "Backspace")
        // A função acaoCalculadora é executada e o texto atual do elemento #ac-ce é passado como parâmetro
        acaoCalculadora(document.querySelector("#ac-ce").textContent);
    else if (event.key == "Enter" || event.key == "NumpadEnter") {
        event.preventDefault();
        acaoCalculadora(event.key.toString());
    }
});
