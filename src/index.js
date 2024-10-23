const readline = require("readline");

// Definindo os personagens
const characters = [
  { 
    name: "Mario", 
    speed: 4, 
    maneuverability: 3, 
    power: 3 
  },
  { 
    name: "Peach", 
    speed: 3, 
    maneuverability: 4, 
    power: 2 
  },
  {
   name: "Yoshi", 
   speed: 2, 
   maneuverability: 4, 
   power: 3 
  },
  { 
    name: "Bowser", 
    speed: 5, 
    maneuverability: 2, 
    power: 5 
  },
  { 
    name: "Luigi", 
    speed: 3, 
    maneuverability: 4, 
    power: 4 
  },
  { 
    name: "Donkey Kong", 
    speed: 2, 
    maneuverability: 2, 
    power: 5 
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function chooseCharacter(player, callback) {
  console.log(`\nEscolha um personagem para ${player}:`);

  characters.forEach((character, index) => {
    console.log(
      `${index + 1}: ${character.name} - Velocidade: ${
        character.speed
      }, Manobrabilidade: ${character.maneuverability}, Poder: ${
        character.power
      }`
    );
  });

  rl.question(`Digite o número do personagem para ${player}: `, (response) => {
    const choice = parseInt(response) - 1;
    if (choice >= 0 && choice < characters.length) {
      callback(characters[choice]);
    } else {
      console.log("Escolha inválida, tente novamente.");
      chooseCharacter(player, callback);
    }
  });
}

function createPlayer(playerName, chosenCharacter) {
  return {
    name: playerName,
    character: chosenCharacter.name,
    speed: chosenCharacter.speed,
    maneuverability: chosenCharacter.maneuverability,
    power: chosenCharacter.power,
    score: 0,
  };
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}
async function playRaceEngine(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // Sorteia bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // Rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + player1.speed;
      totalTestSkill2 = diceResult2 + player2.speed;

      await logRollResult(player1.character, "velocidade", diceResult1, player1.speed);
      await logRollResult(player2.character, "velocidade", diceResult2, player2.speed);    
    } else if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + player1.maneuverability;
      totalTestSkill2 = diceResult2 + player2.maneuverability;

      await logRollResult(player1.character, "manobrabilidade", diceResult1, player1.maneuverability);
      await logRollResult(player2.character, "manobrabilidade", diceResult2, player2.maneuverability);    
    } else if (block === "CONFRONTO") {
      const powerResult1 = diceResult1 + player1.power;
      const powerResult2 = diceResult2 + player2.power;

      console.log(`${player1.character} confrontou com ${player2.character}!🥊`);
      await logRollResult(player1.character, "poder", diceResult1, player1.power);
      await logRollResult(player2.character, "poder", diceResult2, player2.power);

      if (powerResult1 > powerResult2 && player2.score > 0) {
        console.log(`${player1.character} venceu o confronto! ${player2.character} perdeu 1 ponto 🐢`);        
        player2.score--;
      } 
      if (powerResult2 > powerResult1 && player1.score > 0) {
        console.log(`${player2.character} venceu o confronto! ${player1.character} perdeu 1 ponto 🐢`);        
        player1.score--;
      }

      console.log(powerResult2 === powerResult1 ? "Confronto empatado!" : "");
    }

    // Atualizando a contagem de pontos
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${player1.character} marcou um ponto!`);
      player1.score++;
    } 
    if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${player2.character} marcou um ponto!`);
      player2.score++;
    } 
    if (totalTestSkill2 === totalTestSkill1) { 
      console.log("Ninguém marcou ponto! Empatado.");
    }

    console.log("----------------------------------------------------------------------------");
  }

  // Exibir resultado final
  console.log(`🏆 Resultado Final:`);
  console.log(`${player1.character}: ${player1.score} pontos`);
  console.log(`${player2.character}: ${player2.score} pontos`);
  if (player1.score > player2.score) {
    console.log(`${player1.character} é o grande vencedor! 🎉`);
  } else if (player2.score > player1.score) {
    console.log(`${player2.character} é o grande vencedor! 🎉`);
  } else {
    console.log("É um empate! 🤝");
  }
}

(async function startGame() {
  chooseCharacter("Player 1", (player1Chosen) => {
    const player1 = createPlayer("Player 1", player1Chosen);
    chooseCharacter("Player 2", (player2Chosen) => {
      const player2 = createPlayer("Player 2", player2Chosen);

      console.log(`\nPlayer 1 escolheu: ${player1.character}`);
      console.log(
        `Atributos de Player 1: Velocidade: ${player1.speed}, Manobrabilidade: ${player1.maneuverability}, Poder: ${player1.power}, Pontuação: ${player1.score}`
      );

      console.log(`\nPlayer 2 escolheu: ${player2.character}`);
      console.log(
        `Atributos de Player 2: Velocidade: ${player2.speed}, Manobrabilidade: ${player2.maneuverability}, Poder: ${player2.power}, Pontuação: ${player2.score}`
      );

      console.log(
        `🏁🚨 Corrida entre ${player1.character} e ${player2.character} começando...\n`
      );   

      playRaceEngine(player1, player2).then(() => rl.close());
    });
  });
})();