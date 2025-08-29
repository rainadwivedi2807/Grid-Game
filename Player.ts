export interface PlayerObserver {
    notifyPlayerJoined(newPlayer: Player): void;
}

export default class Player implements PlayerObserver {
    playerID: string;
    xCoords: number | null = null;
    yCoords: number | null = null;
    playerAlive: boolean = true;
    private static nextCharCode = 65;   

    private constructor() {
        this.playerID = String.fromCharCode(Player.nextCharCode);
        Player.nextCharCode++;
    }

    static create(): Player {
        return new Player();
    }

    public setPosition(x: number, y: number): void {
        this.xCoords = x;
        this.yCoords = y;
    }

    public moveTo(destinationX: number, destinationY: number): void {
       // If Player is not alive then do not move
       if(!this.playerAlive || this.xCoords === null || this.yCoords === null) {
            return;
        }
        if(this.xCoords !== destinationX && this.yCoords !== destinationY){
            // Move Diagonally
            this.xCoords += this.xCoords < destinationX ? 1 : -1;
            this.yCoords += this.yCoords < destinationY ? 1 : -1;
        }else if(this.xCoords !== destinationX){
            // Move Horizontally
            this.xCoords += this.xCoords < destinationX ? 1 : -1;
        }else if(this.yCoords !== destinationY){
            // Move Vertically
            this.yCoords += this.yCoords < destinationY ? 1 : -1;
        }
    }

    notifyPlayerJoined(newPlayer: Player): void {
        console.log(`Player ${this.playerID} notified: Player ${newPlayer.playerID} joined the game.`);
    }

}