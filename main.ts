import Game from "./Game";
import Player from "./Player";

const game1 = Game.createGame(5, 5);
const game2 = Game.createGame(4, 4);


const playerA = Player.create();
const playerB = Player.create();
const playerC = Player.create();
const playerD = Player.create();
const playerE = Player.create(); 
const playerF = Player.create(); 

console.log(`Created players: ${playerA.playerID}, ${playerB.playerID}, ${playerC.playerID}, ${playerD.playerID}, ${playerE.playerID}, ${playerF.playerID}`);

game1.addPlayer(playerA);
game1.addPlayer(playerB);


// Simulate a new player joining after 3 seconds
setTimeout(() => {
    const newPlayer = Player.create();
    console.log(`\n New player ${newPlayer.playerID} is joining game ${game1.gameID} after game started !!`);
    game1.addPlayer(newPlayer);
}, 5000);

game2.addPlayer(playerC);
game2.addPlayer(playerD);

game2.addPlayer(playerE);
game2.addPlayer(playerF);

game1.start();
game2.start();

