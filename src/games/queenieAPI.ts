import { setDefault, actionsTypeHash, execute } from '../action';
import {
  ActionFunction,
  Game,
  Actions,
  ActionType,
  Card,
  LocationType,
  Location,
  DeckGenerator,
  DeckGenerators,
  GameState,
  Games,
} from '../solitaireTypes';
import {
  createGame,
} from './queenie';
import { GameAPI } from '../gameFactory';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import { getPile, createAndDeal, moveSubPile } from '../gameBoard';
import _ from 'lodash';
import { deal } from '../stock';
import { anyMovesLeft } from './gameFunctions';

let actionSet = new Map<String, ActionFunction>();
setDefault(actionSet, (game: Game, _actions: Actions) => {
  return { game, actions: [], log: [] };
});

actionSet.set(actionsTypeHash([]), (game: Game, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(actionsTypeHash([ActionType.Card]), (game: Game, actions: Actions) => {
  let [card] = actions.map(a => a.value) as [Card];
  if (card.location.type !== LocationType.Stock) {
    return { game, actions, log: [] };
  }
  return { game: deal(game, Games.AceOfHearts), actions: [], log: [] };
});

actionSet.set(actionsTypeHash([ActionType.Location]), (game: Game, actions: Actions) => {
  let [location] = actions.map(a => a.value) as [Location];
  if (location.type !== LocationType.Stock) {
    return { game, actions, log: [] };
  }
  return { game: deal(game, Games.AceOfHearts), actions: [], log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: Game, actions: Actions) => {
    const [fromCard, toCard] = actions.map(a => a.value) as [Card, Card];
    const fromCardPile = getPile(game, fromCard.location);
    const toPile = getPile(game,toCard.location)
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Tableau &&
      game.rules[LocationType.Tableau](game.board, fromCard, toPile)
    ) {
      game = moveSubPile(game, fromCard, toPile);
    }
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Foundation &&
      fromCard === _.last(fromCardPile.cards) &&
      game.rules[LocationType.Foundation](game.board, fromCard, toPile)
    ) {
      game = moveSubPile(game, fromCard, toPile);
    }
    return { game, actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Location]),
  (game: Game, actions: Actions) => {
    let [fromCard, toLocation] = actions.map(a => a.value) as [Card, Location];
    const fromCardPile = getPile(game, fromCard.location);
    const toPile = getPile(game, toLocation)
    if (
      fromCard.location.type === LocationType.Tableau &&
      toLocation.type === LocationType.Foundation &&
      fromCard === _.last(fromCardPile.cards) &&
      game.rules[LocationType.Foundation](game.board, fromCard, toPile)
    ) {
      game = moveSubPile(game, fromCard, toPile);
    }
    if (
      fromCard.location.type === LocationType.Tableau &&
      toLocation.type === LocationType.Tableau &&
      game.rules[LocationType.Tableau](game.board, fromCard, toPile)
    ) {
      game = moveSubPile(game, fromCard, toPile);
    }
    return { game, actions: [], log: [] };
  }
);

let deckGenerator: DeckGenerator = new Map<String, (value: string) => Game>();
deckGenerator.set(DeckGenerators.Seed, value => {
  return createGame(shuffleDeck(DefaultDeck, value));
});

deckGenerator.set(DeckGenerators.PreBuilt, value => {
  return createGame(deckFromString(value));
});

function getGameState(game: Game) {
  const [movesLeft] = anyMovesLeft(game);
  const [foundation] = game.board.foundation;
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
  create: createAndDeal(Games.AceOfHearts)(deckGenerator),
  action: execute(actionSet),
  state: getGameState,
};
