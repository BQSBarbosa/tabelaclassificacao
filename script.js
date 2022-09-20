var jogadores = [];

function exibeJogadoresNaTela(jogadores) {
  jogadores.sort(function (a, b) {
    return b.pontos - a.pontos;
  });

  var cabecalho =
    "<tr><th><img src='https://images.emojiterra.com/google/noto-emoji/v2.034/128px/1f947.png' class='medalha'></th><th>Escudo</th><th>Clube</th><th>Vitórias</th><th>Empates</th><th>Derrotas</th><th>Pontos</th><th colspan='3'>Ações</th></tr>";

  var elemento = "";
  for (var i = 0; i < jogadores.length; i++) {
    elemento += "<tr><td>" + (i + 1) + "º</td>";
    elemento += "<td><img src=" + jogadores[i].imagem + " class='icone'></td>";
    elemento += "<td>" + jogadores[i].nome + "</td>";
    elemento += "<td>" + jogadores[i].vitorias + "</td>";
    elemento += "<td>" + jogadores[i].empates + "</td>";
    elemento += "<td>" + jogadores[i].derrotas + "</td>";
    elemento += "<td>" + jogadores[i].pontos + "</td>";
    elemento +=
      "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
    elemento +=
      "<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>";
    elemento +=
      "<td><button onClick='adicionarDerrota(" + i + ")'>Derrota</button></td>";
    elemento += "</tr>";
  }

  var cabecalhoTabela = document.getElementById("cabecalhoTabela");
  cabecalhoTabela.innerHTML = cabecalho;
  var tabelaJogadores = document.getElementById("tabelaJogadores");
  tabelaJogadores.innerHTML = elemento;
}

// Adiciona um novo time à tabela
function inserirNovoJogador() {
  var nomeNovoJogador = document.getElementById("nomeNovoJogador").value;
  var imagemNovoJogador = document.getElementById("imagemNovoJogador").value;
  var novoJogador = {
    imagem: imagemNovoJogador,
    nome: nomeNovoJogador,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    pontos: 0
  };
  jogadores.push(novoJogador);
  exibeJogadoresNaTela(jogadores);
  document.getElementById("nomeNovoJogador").value = "";
  document.getElementById("imagemNovoJogador").value = "";
}

// Times que ja estao na tabela
var player1 = {
  nome: "Palmeiras",
  imagem:
    "https://ssl.gstatic.com/onebox/media/sports/logos/7spurne-xDt2p6C0imYYNA_48x48.png",
  vitorias: 15,
  empates: 9,
  derrotas: 2,
  pontos: 54
};

var player2 = {
  nome: "Internacional",
  imagem:
    "https://logodetimes.com/times/internacional/logo-internacional-1536.png",
  vitorias: 12,
  empates: 10,
  derrotas: 4,
  pontos: 46
};

var player3 = {
  nome: "Flamengo",
  imagem:
    "https://ssl.gstatic.com/onebox/media/sports/logos/orE554NToSkH6nuwofe7Yg_48x48.png",
  vitorias: 13,
  empates: 6,
  derrotas: 7,
  pontos: 45
};

// Cria uma lista (vetor) com os times que ja estao na tabela
var jogadores = [player1, player2, player3];

// Calcula os pontos do times
player1.pontos = calcularPontos(player1);
player2.pontos = calcularPontos(player2);
player3.pontos = calcularPontos(player3);

exibeJogadoresNaTela(jogadores);

// Função que calcula os pontos que ja estao na tabela
function calcularPontos(jogador) {
  return jogador.vitorias * 3 + jogador.empates * 1 + jogador.derrotas * 0;
}

// Reinicia a tabela
function limparTabela() {
  for (var indice in jogadores) {
    jogadores[indice].vitorias = 0; // Zera o número de vitórias
    jogadores[indice].empates = 0; // Zera o número de empates
    jogadores[indice].derrotas = 0; // Zera o número de derrotas
    jogadores[indice].pontos = 0; // Zera o número de pontos
  }
  exibeJogadoresNaTela(jogadores); // Atualiza a tabela
}

function calculaPontos(jogador) {
  var pontos = jogador.vitorias * 3 + jogador.empates;
  return pontos;
}

function adicionarVitoria(i) {
  var nomeAdversario = prompt("Contra quem " + jogadores[i].nome + " venceu?");
  var jogador = jogadores[i];
  jogador.vitorias++;
  jogador.pontos = calculaPontos(jogador);
  for (var i = 0; i < jogadores.length; i++) {
    if (nomeAdversario == jogadores[i].nome) {
      jogadores[i].derrotas++;
      jogadores[i].pontos = calculaPontos(jogadores[i]);
    }
  }
  exibeJogadoresNaTela(jogadores);
}

function adicionarEmpate(i) {
  var nomeAdversario = prompt("Contra quem " + jogadores[i].nome + " empatou?");
  var jogador = jogadores[i];
  jogador.empates++;
  jogador.pontos = calculaPontos(jogador);
  for (var i = 0; i < jogadores.length; i++) {
    if (nomeAdversario == jogadores[i].nome) {
      jogadores[i].empates++;
      jogadores[i].pontos = calculaPontos(jogadores[i]);
    }
  }
  exibeJogadoresNaTela(jogadores);
}

function adicionarDerrota(i) {
  var nomeAdversario = prompt("Contra quem " + jogadores[i].nome + " perdeu?");
  var jogador = jogadores[i];
  jogador.derrotas++;
  jogador.pontos = calculaPontos(jogador);
  for (var i = 0; i < jogadores.length; i++) {
    if (nomeAdversario == jogadores[i].nome) {
      jogadores[i].vitorias++;
      jogadores[i].pontos = calculaPontos(jogadores[i]);
    }
  }
  exibeJogadoresNaTela(jogadores);
}

var telaCampeao = document.getElementById("resultado");
function finalizarTorneio() {
  var elemento = ""; // Inicializa o elemento HTML que será mostrado
  var maior = 0; // Iniciamente define o maior pontuador com 0 pontos
  for (var indice in jogadores) {
    // Verifica o maior pontuador do torneio
    if (jogadores[indice].pontos > maior) {
      var vencedor = indice; // Guarda o indice do maior pontuador
      maior = jogadores[indice].pontos; // Guarda a maior pontuação
    }
  }
  // Constroi a estrutura que será exibida
  elemento += "<h4>🎉</h4>";
  elemento += "<h3>" + jogadores[vencedor].nome + "</h3>";
  elemento +=
    "<p><img src=" + jogadores[vencedor].imagem + " class=champion-image></p>";
  elemento += "<p>" + jogadores[vencedor].pontos + " Pontos (";
  elemento += jogadores[vencedor].vitorias + " Vitórias)</p>";
  telaCampeao.innerHTML = elemento; // Exibe o Campeão
}