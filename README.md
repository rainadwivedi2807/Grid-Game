## Grid Game (TypeScript)
A grid-based multiplayer game where players move every 5 seconds toward a destination.  
If two players land on the same cell, they are eliminated.  
Implemented in TypeScript using some design pattern:
1- Factory Pattern: To create games and players using static methods encapsulate object creation, allowing us to instantiate Game and Player without exposing their constructors directly.
2- Singleton: The 'idCounter' variable in Game.ts is used to generate unique game IDs and unique Players.
3- Observer: All existing players are notified when a new player joins the game, using the Observer pattern.

## Run Locally
```bash
git clone https://github.com/your-username/Grid-Game.git (either http or ssh)
cd Grid-Game
npm install
npm start
