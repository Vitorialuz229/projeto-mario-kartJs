const readline = require("readline");

// Defining the characters
const characters = [
  {
    name: "Mario",
    speed: 4,
    maneuverability: 3,
    power: 3,
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
    console.log(`${index + 1}: ${character.name} - Velocidade: ${character.speed}, Manobrabilidade: ${character.maneuverability}, Poder: ${character.power}`);
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

function startGame() {
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

      rl.close();
    });
  });
}

startGame();
