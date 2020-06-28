import { setDefault, actionsTypeHash, execute } from '../action';
import { ActionFunction, GameBoard, Actions, ActionType, Card, LocationType, Location, DeckGenerator, DeckGenerators } from '../solitaireTypes';
import { dealFromStock, moveCardInTableau, moveToFoundation, moveToEmptyTableau, createAndDeal, createGame } from './aceOfHearts';
import { GameAPI } from '../gameFactory';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';

let actionSet = new Map<String, ActionFunction>();
setDefault(actionSet, (game: GameBoard, _actions: Actions) => {
  return { game, actions: [], log: [] };
});

actionSet.set(actionsTypeHash([]), (game: GameBoard, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    if ((actions[0].value as Card).location.type !== LocationType.Stock) {
      return { game, actions, log: [] };
    }
    return { game: dealFromStock(game), actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Location]),
  (game: GameBoard, actions: Actions) => {
    if ((actions[0].value as Location).type !== LocationType.Stock) {
      return { game, actions, log: [] };
    }
    return { game: dealFromStock(game), actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    let fromCard = actions[0].value as Card;
    let toCard = actions[1].value as Card;
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Tableau
    ) {
      game = moveCardInTableau(game, fromCard, toCard);
    }
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Foundation
    ) {
      game = moveToFoundation(game, fromCard);
    }
    return { game, actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Location]),
  (game: GameBoard, actions: Actions) => {
    let fromCard = actions[0].value as Card;
    let toLocation = actions[1].value as Location;
    if (
      fromCard.location.type === LocationType.Tableau &&
      toLocation.type === LocationType.Foundation
    ) {
      game = moveToFoundation(game, fromCard);
    }
    if (
      fromCard.location.type === LocationType.Tableau &&
      toLocation.type === LocationType.Tableau
    ) {
      game = moveToEmptyTableau(game, fromCard, toLocation);
    }
    return { game, actions: [], log: [] };
  }
);

let deckGenerator:DeckGenerator = new Map<String, (value:string)=>GameBoard>();
deckGenerator.set(DeckGenerators.Seed,(value)=>{
    return createGame(shuffleDeck(DefaultDeck,value))
})

deckGenerator.set(DeckGenerators.PreBuilt,(value)=>{
    return createGame(deckFromString(value))
})

export const api: GameAPI = {
  create: createAndDeal(deckGenerator),
  action: execute(actionSet)
};
