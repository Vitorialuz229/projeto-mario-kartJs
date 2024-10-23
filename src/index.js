const readline = require("readline");

// Definindo os personagens
const personagens = [
  {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
  },
  { 
    nome: "Peach", 
    velocidade: 3, 
    manobrabilidade: 4, 
    poder: 2 
  },
  { 
    nome: "Yoshi", 
    velocidade: 2, 
    manobrabilidade: 4, 
    poder: 3 
  },
  { 
    nome: "Bowser", 
    velocidade: 5, 
    manobrabilidade: 2, 
    poder: 5 
  },
  { 
    nome: "Luigi", 
    velocidade: 3, 
    manobrabilidade: 4, 
    poder: 4 
  },
  { 
    nome: "Donkey Kong", 
    velocidade: 2, 
    manobrabilidade: 2, 
    poder: 5 
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function escolherPersonagem(jogador, callback) {
  console.log(`\nEscolha um personagem para ${jogador}:`);
  personagens.forEach((personagem, index) => {
    console.log(`${index + 1}: ${personagem.nome}`);
  });

  rl.question(`Digite o número do personagem para ${jogador}: `, (resposta) => {
    const escolha = parseInt(resposta) - 1;
    if (escolha >= 0 && escolha < personagens.length) {
      callback(personagens[escolha]);
    } else {
      console.log("Escolha inválida, tente novamente.");
      escolherPersonagem(jogador, callback);
    }
  });
}

function criarJogador(nomeDoJogador, personagemEscolhido) {
  return {
    nome: nomeDoJogador,
    personagem: personagemEscolhido.nome,
    velocidade: personagemEscolhido.velocidade,
    manobrabilidade: personagemEscolhido.manobrabilidade,
    poder: personagemEscolhido.poder,
    pontuacao: 0,
  };
}

function iniciarJogo() {
  escolherPersonagem("Player 1", (player1Escolhido) => {
    const player1 = criarJogador("Player 1", player1Escolhido);
    escolherPersonagem("Player 2", (player2Escolhido) => {
      const player2 = criarJogador("Player 2", player2Escolhido);

      console.log(`\nPlayer 1 escolheu: ${player1.personagem}`);
      console.log(
        `Atributos de Player 1: Velocidade: ${player1.velocidade}, Manobrabilidade: ${player1.manobrabilidade}, Poder: ${player1.poder}, Pontuação: ${player1.pontuacao}`
      );

      console.log(`\nPlayer 2 escolheu: ${player2.personagem}`);
      console.log(
        `Atributos de Player 2: Velocidade: ${player2.velocidade}, Manobrabilidade: ${player2.manobrabilidade}, Poder: ${player2.poder}, Pontuação: ${player2.pontuacao}`
      );

      rl.close();
    });
  });
}

iniciarJogo();
