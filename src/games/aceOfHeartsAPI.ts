import { setDefault, actionsTypeHash, execute } from '../action';
import {
  ActionFunction,
  GameBoard,
  Actions,
  ActionType,
  Card,
  LocationType,
  Location,
  DeckGenerator,
  DeckGenerators,
  GameState,
} from '../solitaireTypes';
import {
  dealFromStock,
  moveCardInTableau,
  moveToFoundation,
  moveToEmptyTableau,
  createAndDeal,
  createGame,
  anyMovesLeft,
} from './aceOfHearts';
import { GameAPI } from '../gameFactory';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import { getPile } from '../gameBoard';
import _ from 'lodash';

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
    let [card] = actions.map(a => a.value) as [Card];
    if (card.location.type !== LocationType.Stock) {
      return { game, actions, log: [] };
    }
    return { game: dealFromStock(game), actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Location]),
  (game: GameBoard, actions: Actions) => {
    let [location] = actions.map(a => a.value) as [Location];
    if (location.type !== LocationType.Stock) {
      return { game, actions, log: [] };
    }
    return { game: dealFromStock(game), actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    const [fromCard, toCard] = actions.map(a => a.value) as [Card, Card];
    const fromCardPile = getPile(game, fromCard.location);
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Tableau
    ) {
      game = moveCardInTableau(game, fromCard, toCard);
    }
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Foundation &&
      fromCard === _.last(fromCardPile.cards)
    ) {
      game = moveToFoundation(game, fromCard);
    }
    return { game, actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Location]),
  (game: GameBoard, actions: Actions) => {
    let [fromCard, toLocation] = actions.map(a => a.value) as [Card, Location];
    const fromCardPile = getPile(game, fromCard.location);
    if (
      fromCard.location.type === LocationType.Tableau &&
      toLocation.type === LocationType.Foundation &&
      fromCard === _.last(fromCardPile.cards)
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

let deckGenerator: DeckGenerator = new Map<
  String,
  (value: string) => GameBoard
>();
deckGenerator.set(DeckGenerators.Seed, value => {
  return createGame(shuffleDeck(DefaultDeck, value));
});

deckGenerator.set(DeckGenerators.PreBuilt, value => {
  return createGame(deckFromString(value));
});

function getGameState(game: GameBoard) {
  const [movesLeft] = anyMovesLeft(game);
  const [foundation] = game.foundation;
  if (foundation.cards.length === 52) {
    return GameState.GameOver;
  }
  if (movesLeft) {
    return GameState.InProgress;
  } else {
    return GameState.NoMoreMoves;
  }
}

export const api: GameAPI = {
  create: createAndDeal(deckGenerator),
  action: execute(actionSet),
  state: getGameState,
};
