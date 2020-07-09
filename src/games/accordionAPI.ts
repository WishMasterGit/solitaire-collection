import {
  DeckGenerator,
  Game,
  DeckGenerators,
  ActionFunction,
  Actions,
  ActionType,
  Card,
  GameState,
  Locations,
  Games,
} from '../solitaireTypes';
import { create, moveCardTo, anyMovesLeft } from './accordion';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import { setDefault, actionsTypeHash, execute } from '../action';
import { getPile, createAndDeal } from '../gameBoard';
import { GameAPI } from '../gameFactory';

const deckGenerator: DeckGenerator = new Map<String, (value: string) => Game>();
deckGenerator.set(DeckGenerators.Seed, value => {
  return create(shuffleDeck(DefaultDeck, value));
});
deckGenerator.set(DeckGenerators.PreBuilt, value => {
  return create(deckFromString(value));
});

let actionSet = new Map<String, ActionFunction>();
setDefault(actionSet, (game: Game, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: Game, actions: Actions) => {
    const [fromCard, toCard] = actions.map(a => a.value) as [Card, Card];

    if (game.rules[Locations.Tableau0.type](game.board, fromCard, toCard)) {
      return { game: moveCardTo(game, fromCard, toCard), actions: [], log: [] };
    }
    return { game: game, actions: [], log: [] };
  }
);

export function getGameState(game: Game): GameState {
  const [anyMoves] = anyMovesLeft(game);
  const waste = getPile(game.board, Locations.Waste0);
  if (!anyMoves) {
    return GameState.NoMoreMoves;
  }
  if (waste.cards.length === 52) {
    return GameState.GameOver;
  }
  return GameState.InProgress;
}

export const api: GameAPI = {
  create: createAndDeal(Games.Accordion)(deckGenerator),
  action: execute(actionSet),
  state: getGameState,
};
