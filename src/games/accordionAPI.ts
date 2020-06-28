import {
  DeckGenerator,
  GameBoard,
  DeckGenerators,
  ActionFunction,
  Actions,
  ActionType,
  Card,
  GameState,
  Locations,
} from '../solitaireTypes';
import { create, moveCardTo, createAndDeal, anyMovesLeft } from './accordion';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import { setDefault, actionsTypeHash, execute } from '../action';
import { findInPile, getPile } from '../gameBoard';
import { GameAPI } from '../gameFactory';

const deckGenerator: DeckGenerator = new Map<
  String,
  (value: string) => GameBoard
>();
deckGenerator.set(DeckGenerators.Seed, value => {
  return create(shuffleDeck(DefaultDeck, value));
});
deckGenerator.set(DeckGenerators.PreBuilt, value => {
  return create(deckFromString(value));
});

let actionSet = new Map<String, ActionFunction>();
setDefault(actionSet, (game: GameBoard, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    const [fromCard, toCard] = actions.map(a=>a.value) as [Card,Card]
    const from = findInPile(game, fromCard);
    const to = findInPile(game, toCard);
    let [, result] = moveCardTo(game, from, to);
    return { game: result, actions: [], log: [] };
  }
);

export function getGameState(game: GameBoard): GameState {
  const [anyMoves] = anyMovesLeft(game);
  const waste = getPile(game, Locations.Waste0);
  if (!anyMoves) {
    return GameState.NoMoreMoves;
  }
  if (waste.cards.length === 52) {
    return GameState.GameOver;
  }
  return GameState.InProgress;
}

export const api: GameAPI = {
  create: createAndDeal(deckGenerator),
  action: execute(actionSet),
  state: getGameState
};
