interface Game {
    id: string;
    whitePlayerName: string;
    blackPlayerName: string;
    moves: string[];
}

export class GameManager {
     games: Game[]  = [];
     private static instance: GameManager; //STATIC Attribute that associated with class(GameManger.instance)
     private constructor() {
        this.games = [];
     }
    static  getInstance() {
      if(GameManager.instance) {
         return GameManager.instance;
      }
      GameManager.instance = new GameManager();
      return GameManager.instance

     }
     
 addMove(gameId: string, move: string) { 
    const game = this.games.find(game => game.id === gameId);
    game?.moves.push(move);
 }
 addGame(gameId: string) {
    const game = {
    id: gameId,
    whitePlayerName: "alice",
    blackPlayerName: "denzel",
    moves: [],
         
    }
    this.games.push(game);
 } 
 log() {
   console.log(this.games)
 }  
}
// GameManager.getInstance();

// export const gameManager = new GameManager();
// export const gameManager = GameManager.getInstance(); 

