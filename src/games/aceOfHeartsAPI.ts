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
  ActionResult,
} from '../solitaireTypes';
import { createGame, anyMovesLeft } from './aceOfHearts';
import { GameAPI } from '../gameFactory';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import { getPile, moveSubPile, asCard } from '../gameBoard';
import { deal } from '../stock';
import { createAndDeal } from '../deal';

function moveCards(game: Game, fromCard: Card, toLocation: Location) {
  const toPile = getPile(game.board, toLocation);
  if (game.rules[toPile.location.type](game.board, fromCard, toPile)) {
    game = moveSubPile(game, fromCard, toPile);
  }
  return game;
}

const singleClickAction = (game: Game, actions: Actions): ActionResult => {
  let [card] = actions.map(a => a.value) as [Card];
  let [location] = actions.map(a => a.value) as [Location];

  if (asCard(card)) {
    location = card.location;
  }
  if (location.type !== LocationType.Stock) {
    return { game, actions, log: [] };
  }
  return { game: deal(game, Games.AceOfHearts), actions: [], log: [] };
};

let actionSet = new Map<String, ActionFunction>();
setDefault(actionSet, (game, _actions) => {
  return { game, actions: [], log: [] };
});

actionSet.set(actionsTypeHash([]), (game, actions) => {
  return { game, actions, log: [] };
});

actionSet.set(actionsTypeHash([ActionType.Card]), singleClickAction);

actionSet.set(actionsTypeHash([ActionType.Location]), singleClickAction);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: Game, actions: Actions) => {
    const [fromCard, toCard] = actions.map(a => a.value) as [Card, Card];
    game = moveCards(game, fromCard, toCard.location);
    return { game, actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Location]),
  (game: Game, actions: Actions) => {
    let [fromCard, toLocation] = actions.map(a => a.value) as [Card, Location];
    game = moveCards(game, fromCard, toLocation);
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
