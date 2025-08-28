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
// game2.addPlayer(playerC);
// game2.addPlayer(playerD);

// game2.addPlayer(playerE);
// game2.addPlayer(playerF);

// game1.renderGame();
// game2.renderGame();


game1.start();
// game2.start();

