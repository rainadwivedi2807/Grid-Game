import Player, { PlayerObserver } from "./Player";

let idCounter = 1;

export default class Game{
    gameID: number;
    width: number;
    height: number;
    grid: string[][];
    gameStarted: boolean = false;
    destination:{ x: number, y: number };
    players: Player[] = [];
    turn: number = 1;
    emptycell : number;
    maxPlayer : number = 0;
    intervalID: NodeJS.Timeout | null = null;
    observers: PlayerObserver[] = [];


    private constructor(width: number, height: number) {
        this.gameID = idCounter++;
        this.width = width;
        this.height = height;
        this.grid = Array.from({ length: height }, () => Array(width).fill(' '));
        this.destination = this.generateDestination();
        this.maxPlayer = this.width * this.height - 1 ;
        this.emptycell = this.width * this.height - 1 ;
    }

    private generateDestination() : { x: number, y: number } {
        let xCoords = Math.floor(Math.random() * this.width);
        let yCoords =  Math.floor(Math.random() * this.height)
        this.emptycell = this.emptycell - 1;
        return { x: xCoords, y: yCoords };
    }

    private updatePosition(){
        for(let player of this.players){
            player.moveTo(this.destination.x, this.destination.y);        
        }
    }

    public addPlayer(player: Player){
        if(this.players.length >= this.emptycell) {
            console.log(`Cannot add player ${player.playerID}, max players allowed (${this.maxPlayer}) in this game ${this.gameID}`);
            return;
        }

        let x: number;
        let y: number;
        do {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        } while (
            (x === this.destination.x && y === this.destination.y) ||
            (this.players.some((p) => p.xCoords === x && p.yCoords === y))
        );

        player.setPosition(x, y);
        player.playerAlive = true;
        this.emptycell = this.emptycell - 1;
        this.players.push(player);

        // Observer pattern: notify all existing players
        for (const observer of this.observers) {
            observer.notifyPlayerJoined(player);
        }
        this.observers.push(player);
   }


    static createGame( width: number, height: number): Game {
        return new Game(width, height);
    }

    public renderGame() {

        this.grid = Array.from({ length: this.height }, () =>
            Array(this.width).fill("_")
        );

        if (this.destination) {
            this.grid[this.destination.y][this.destination.x] = "X";
        }

        for (let player of this.players) {
            if (player.xCoords !== null && player.yCoords !== null && player.playerAlive) {
                this.grid[player.yCoords][player.xCoords] = player.playerID;
            }
        }

        console.log(`\nGame ${String(this.gameID).padStart(2, "0")} Turn ${this.turn}:\n`);
        for (let row of this.grid) {
            console.log(row.join(" "));
        }
    }

    private checkWinner() : Player | null {
        for(let player of this.players){
            if(player.playerAlive && player.xCoords === this.destination.x && player.yCoords === this.destination.y){
                return player;
            }
        }

        return null;
    }

    private handleCollisions() {
        const positionMap = new Map<string, Player[]>();
        for (let player of this.players) {
            if (!player.playerAlive || player.xCoords === null || player.yCoords === null) continue;
            const key = `${player.xCoords},${player.yCoords}`;
            if (!positionMap.has(key)) {
                positionMap.set(key, []);
            }
            positionMap.get(key)!.push(player);
        }

        for (let [pos, playersAtPos] of positionMap.entries()) {
            if (playersAtPos.length > 1) {
                // Check if collision is at destination
                const [x, y] = pos.split(',').map(Number);
                if (x === this.destination.x && y === this.destination.y) {
                    console.log(
                        `Collision at destination (${pos})! Declaring winners: ${playersAtPos.map(p => p.playerID).join(", ")}`
                    );
                    for (let p of playersAtPos) {
                        p.playerAlive = true; // keep them alive for winner check
                    }
                } else {
                    console.log(
                        `Collision at (${pos})! Eliminating players: ${playersAtPos.map(p => p.playerID).join(", ")}`
                    );
                    for (let p of playersAtPos) {
                        p.playerAlive = false;
                    }
                }
            }
        }
    }

    public start(){
        if(this.gameStarted){
            console.log(`Game ${this.gameID} has already started!`);
            return;
        }
   
        this.gameStarted = true;
        this.turn = 1;
        this.renderGame();

        this.intervalID = setInterval(() => {
            this.turn++;
            this.updatePosition();
            this.handleCollisions();
            const winner = this.checkWinner();
            this.renderGame();
            if(winner){
                console.log(`Game ${this.gameID} has ended! Winner: ${winner.playerID}`);
                this.stop();
            }

        }, 5000); // Every player can move one square every 5 seconds
    }

    public stop() {
        if(this.intervalID){
            clearInterval(this.intervalID);
            this.intervalID = null; 
        }
        this.gameStarted = false;
    }

}