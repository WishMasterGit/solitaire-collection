import { Game, LocationType, Locations, Games, Face } from './solitaireTypes';
import { canGetCradFrom, moveLastCard, getPile } from './gameBoard';

export function initialDeal(game: Game, gameType: Games): Game {
  return initialDeals.get(gameType)?.(game) as Game;
}

const tableauPyramidLike = (game: Game): Game => {
  let tableaus = game.board[LocationType.Tableau];
  for (let tableau of tableaus) {
    for (let j = 1; j <= tableau.location.index + 1; j++) {
      if (canGetCradFrom(game, Locations.Stock)) {
        game = moveLastCard(game, Locations.Stock, tableau.location);
      }
    }
  }
  return game;
};

const tableauYukonLike = (game: Game): Game => {
  let tableaus = game.board[LocationType.Tableau];
  for (let tableau of tableaus) {
    switch (tableau.location.index) {
      case 0:
        if (canGetCradFrom(game, Locations.Stock)) {
          game = moveLastCard(game, Locations.Stock, tableau.location);
        }
        break;
      default:
        for (let j = 1; j <= tableau.location.index + 5; j++) {
          if (canGetCradFrom(game, Locations.Stock)) {
            game = moveLastCard(
              game,
              Locations.Stock,
              tableau.location,
              j <= tableau.location.index ? Face.Down : Face.Up
            );
          }
        }
    }
  }
  return game;
};

const tableauInline = (game: Game) => {
  let stock = getPile(game.board, Locations.Stock);
  while (stock.cards.length > 0) {
    game = moveLastCard(game, Locations.Stock, Locations.Tableau0);
    stock = getPile(game.board, Locations.Stock);
  }
  return game;
};

const initialDeals = new Map<Games, (game: Game) => Game>();
initialDeals.set(Games.AceOfHearts, tableauPyramidLike);
initialDeals.set(Games.Queenie, tableauPyramidLike);
initialDeals.set(Games.Yukon, tableauYukonLike);
initialDeals.set(Games.Accordion, tableauInline);

export function deal(game: Game, gameType: Games): Game {
  return deals.get(gameType)?.(game) as Game;
}

const deals = new Map<Games, (game: Game) => Game>();
const pyramidLikeDeal = (game: Game) => {
  let tableaus = game.board[LocationType.Tableau];
  for (let tableau of tableaus) {
    if (canGetCradFrom(game, Locations.Stock)) {
      game = moveLastCard(game, Locations.Stock, tableau.location);
    }
  }
  return game;
};

deals.set(Games.AceOfHearts, pyramidLikeDeal);
deals.set(Games.Queenie, pyramidLikeDeal);
