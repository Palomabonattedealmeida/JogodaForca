const pincel = document.querySelector(".canvas-forca").getContext("2d");
pincel.lineWidth = 8;
pincel.lineCap = "round";
pincel.lineJoin = "round";
pincel.strokeStyle = "#55179TO";
const palavras = ["DESAFIO", "BRASIL", "ARVORE", "CADEIRA", "COMPUTADOR", "ESCOLA", "HUMANO", "CIDADE", "FOTOGRAFIA", "SHOPPING", 'PERFUME', 'DINHEIRO', 'OCEANO', 'EXTENSOR', 'PENSAMENTO']
let palavraAleatoria;
const letrasErradas = [];
const letrasCertas = [];
let erros = 0;
let acertos = 0;
const telaInicio = document.querySelector(".inicio");
const telaJogo = document.querySelector(".jogo");
const divPalavra = document.querySelector(".caixa-palavra");
const divLetraErrada = document.querySelector(".caixa-letra-errada");
const telaNovaPalavra = document.querySelector(".nova-palavra");
const inputPalavra = document.querySelector(".palavra-frase");
const divTeclado = document.querySelector(".teclado");
const perdeu = document.querySelector(".perdeu");
const venceu = document.querySelector(".venceu");

function desenhaForca() {
    pincel.beginPath();
    pincel.moveTo(30, 400);
    pincel.lineTo(320, 400);
    pincel.stroke();
    pincel.closePath();
    pincel.beginPath();
    pincel.moveTo(80, 400);
    pincel.lineTo(80, 50);
    pincel.lineTo(255, 50);
    pincel.lineTo(255, 100);
    pincel.stroke();
    pincel.closePath();
}

function sorteiaPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
}

function criaEspacoLetras() {
    for (let i = 0; i < palavraAleatoria.length; i++) {
        const span = document.createElement("span");
        span.className = "espaco-letra";
        span.id = i;
        divPalavra.append(span);
        if (/[\s]/.test(palavraAleatoria[i])) {
            document.getElementById(i).innerHTML = " ";
            document.getElementById(i).style.border = "none";
        }
    }
}

function criaTeclado() {
    const teclasDoTeclado = {"linha-1": ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], "linha-2": ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ç"], "linha-3": ["Z", "X", "C", "V", "B", "N", "M"]};
    Object.keys(teclasDoTeclado).forEach((key) => {
        divTeclado.innerHTML += `<div id="${key}"></div>`;
        teclasDoTeclado[key].forEach((tecla) => { 
            document.getElementById(key).innerHTML += `<button id="${tecla}" class="botoes-teclado" onclick="verificaLetraEAdiciona('${tecla}')">${tecla}</button>`;
        });
    });
}

function desenhaBonecoForca() {
    switch (erros) {
        case 1:
            // cabeça
            pincel.beginPath();
            pincel.moveTo(285, 130);
            pincel.arc(255, 130, 30, 0, 2 * Math.PI);
            pincel.stroke();
            pincel.closePath();
            break;

        case 2:
            // tronco
            pincel.beginPath();
            pincel.moveTo(255, 160);
            pincel.lineTo(255, 255);
            pincel.stroke();
            pincel.closePath();
            break;

        case 3:
            // braço esquerdo
            pincel.beginPath();
            pincel.moveTo(255, 180);
            pincel.lineTo(220, 230);
            pincel.stroke();
            pincel.closePath();
            break;

        case 4:
            // braço direito
            pincel.beginPath();
            pincel.moveTo(255, 180);
            pincel.lineTo(290, 230);
            pincel.stroke();
            pincel.closePath();
            break;

        case 5:
            // perna esquerda
            pincel.beginPath();
            pincel.moveTo(255, 255);
            pincel.lineTo(220, 300);
            pincel.stroke();
            pincel.closePath();
            break;

        case 6:
            // perna direita
            pincel.beginPath();
            pincel.moveTo(255, 255);
            pincel.lineTo(290, 300);
            pincel.stroke();
            pincel.closePath();
    }
}

function limpaTela() {
    pincel.clearRect(0, 0, 350, 410);
    letrasErradas.splice(0, letrasErradas.length);
    letrasCertas.splice(0, letrasCertas.length);
    erros = 0;
    acertos = 0;
    divPalavra.innerHTML = "";
    divLetraErrada.innerHTML = "";
    divTeclado.innerHTML = "";
    document.querySelector(".paragrafo-fim").innerHTML = "";
}

function comecaJogo() {
    limpaTela();
    telaInicio.style.display = "none";
    telaJogo.style.display = "flex";
    desenhaForca();
    palavraAleatoria = sorteiaPalavra();
    criaEspacoLetras();
    criaTeclado();
}

function verificaSeVenceu() {
    if (palavraAleatoria.includes(" ")) {
        const quantidadeDeEspacos = palavraAleatoria.match(/[\s]/);
        if (acertos === palavraAleatoria.length - quantidadeDeEspacos.length) {
            venceu.style.display = "block";
        }
    } else if (acertos === palavraAleatoria.length) {
        venceu.style.display = "block";
    }
}

function verificaSePerdeu() {
    if (erros === 6) {
        perdeu.style.display = "block";
        document.querySelector(".paragrafo-fim").innerHTML += `<p>A palavra era "${palavraAleatoria.toLowerCase()}"!</p>`;
    }
}

function verificaLetraEAdiciona(tecla) {
    const espacoLetraCerta = document.querySelectorAll(".espaco-letra");
    if (letrasCertas.includes(tecla))
        return;
    for (let i = 0; i < palavraAleatoria.length; i++) {
        if (tecla === palavraAleatoria[i]) {
                acertos++;
                letrasCertas.push(tecla);
                verificaSeVenceu();
                espacoLetraCerta[i].innerHTML = tecla;
                document.getElementById(tecla).style.background = "green";
            }
        }
    if (!palavraAleatoria.includes(tecla) && !letrasErradas.includes(tecla)) {
        letrasErradas.push(tecla);
        divLetraErrada.innerHTML += tecla;
        erros++;
        desenhaBonecoForca();
        verificaSePerdeu();
        document.getElementById(tecla).style.background = "rgb(189, 3, 3)";
    }
}

// pega a letra apertada no teclado físico
document.addEventListener("keyup", (evento) => {
    const letra = evento.key.toUpperCase();
    verificaLetraEAdiciona(letra);
});

function mostraTelaAdicionarPalavra() {
    telaInicio.style.display = "none";
    telaNovaPalavra.style.display = "flex";
}

// função para impedir letras acentuadas e caracteres especiais de serem digitadas no textarea
inputPalavra.addEventListener("beforeinput", (evento) => {
    if (/[^A-zÇç\s]/.test(evento.data)) {
        evento.preventDefault();
    }
});

function adicionaPalavra() {
    const palavra = inputPalavra.value.toUpperCase();
    const p = document.createElement("p");
    if (palavras.includes(palavra)) {
        inputPalavra.insertAdjacentElement("afterend", p);
        p.innerHTML = "<strong><em>Esta palavra já foi adicionada!</em></strong>";
        inputPalavra.value = "";
    } else {
        p.innerHTML = "";
        console.log(palavra);
        palavras.push(palavra);
        telaNovaPalavra.style.display = "none";
        comecaJogo();
    }
}

function recarregaPagina() {
    //não sei como fazer window.location.reload(); manter as alterações nas palavras adicionadas
    limpaTela();
    telaJogo.style.display = "none";
    telaNovaPalavra.style.display = "none";
    venceu.style.display = "none";
    perdeu.style.display = "none";
    telaInicio.style.display = "flex";
}

document.querySelector(".botao-jogar").onclick = comecaJogo;
document.querySelector(".botao-adicionar-palavra").onclick = mostraTelaAdicionarPalavra;
document.querySelector(".botao-salvar-comecar").onclick = adicionaPalavra;
document.querySelector(".botao-cancelar").onclick = recarregaPagina;
document.querySelector(".botao-novo-jogo").onclick = comecaJogo;
document.querySelector(".botao-desistir").onclick = recarregaPagina;
const botoesVoltar = document.querySelectorAll(".botao-voltar");
botoesVoltar.forEach((botao) => { botao.onclick = recarregaPagina;});