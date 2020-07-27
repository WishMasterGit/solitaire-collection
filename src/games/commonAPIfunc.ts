import {
  Game,
  Card,
  Location,
  Rule,
  Actions,
  ActionResult,
  LocationType,
  ActionFunction,
  ActionType,
  DeckGenerator,
  DeckGenerators,
  Deck,
  GameState,
  Pile,
  Face,
} from '../solitaireTypes';
import { getPile, moveSubPile, asCard, moveLastCard } from '../gameBoard';
import { deal } from '../stock';
import { setDefault, actionsTypeHash } from '../action';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import _ from 'lodash';

export function moveCards(game: Game, fromCard: Card, toLocation: Location, rules: Rule) {
  const toPile = getPile(game.board, toLocation);
  if (rules[toPile.location.type](game.board, fromCard, toPile)) {
    game = moveSubPile(game, fromCard, toPile);
    game = turnLastCard(game, getPile(game.board, fromCard.location));
  }
  return game;
}

export function autoMoveToFoundation(game: Game, fromCard: Card, rules: Rule) {
  const foundations = game.board.foundation
  for (let f of foundations){
    const toLocation = f.location
    const toPile = getPile(game.board, toLocation);
    if (rules[toPile.location.type](game.board, fromCard, toPile)) {
      game = moveSubPile(game, fromCard, toPile);
      game = turnLastCard(game, getPile(game.board, fromCard.location));
      return game;
    }
  }
  return game;
}

export function turnLastCard(game: Game, pile: Pile) {
  if (pile.cards.length <= 0) return game;
  const lastCard = _.last(pile.cards) as Card;
  if (lastCard.face === Face.Down) {
    game = moveLastCard(game, pile.location, pile.location, Face.Up);
  }
  return game;
}

export const singleClickAction = (game: Game, actions: Actions): ActionResult => {
  let [card] = actions.map(a => a.value) as [Card];
  let [location] = actions.map(a => a.value) as [Location];

  if (asCard(card)) {
    location = card.location;
  }
  if (location.type !== LocationType.Stock) {
    return { game, actions, log: [] };
  }
  return { game: deal(game, game.meta.type), actions: [], log: [] };
};

export function getActionSet(rules: Rule) {
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
      game = moveCards(game, fromCard, toCard.location, rules);
      return { game, actions: [], log: [] };
    }
  );
  actionSet.set(
    actionsTypeHash([ActionType.Card, ActionType.DoubleClick]),
    (game: Game, actions: Actions) => {
      const [fromCard] = actions.map(a => a.value) as [Card];
      game = moveCards(game, fromCard, toCard.location, rules);
      return { game, actions: [], log: [] };
    }
  );

  actionSet.set(
    actionsTypeHash([ActionType.Card, ActionType.Location]),
    (game: Game, actions: Actions) => {
      let [fromCard, toLocation] = actions.map(a => a.value) as [Card, Location];
      game = moveCards(game, fromCard, toLocation, rules);
      return { game, actions: [], log: [] };
    }
  );
  return actionSet;
}

export function getDeckGenerator(createGame: (deck: Deck) => Game) {
  let deckGenerator: DeckGenerator = new Map<String, (value: string) => Game>();
  deckGenerator.set(DeckGenerators.Seed, value => {
    return createGame(shuffleDeck(DefaultDeck, value));
  });

  deckGenerator.set(DeckGenerators.PreBuilt, value => {
    return createGame(deckFromString(value));
  });
  return deckGenerator;
}

export const getGameState = (
  anyMovesLeft: (game: Game) => [boolean, Card | undefined, Card | undefined]
) => {
  return (game: Game) => {
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
  };
};
