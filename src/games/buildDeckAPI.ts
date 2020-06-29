import { ActionFunction, GameBoard, Actions, ActionType, Card, Face, Locations, DeckGenerator, DeckGenerators, GameState } from '../solitaireTypes';
import { setDefault, actionsTypeHash, execute } from '../action';
import { removeFromPile, getPile, updatePile } from '../gameBoard';
import { turnCard, moveCard } from '../card';
import produce from 'immer';
import { GameAPI } from '../gameFactory';
import { createAndDeal, create } from './buildDeck';
import { DefaultDeck, deckFromString } from '..//deck';

let actionSet = new Map<String, ActionFunction>();

setDefault(actionSet, (game: GameBoard, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(actionsTypeHash([ActionType.Card]), (game: GameBoard, actions: Actions) => {
  let card = actions[0].value as Card;
  let result = removeFromPile(game, card);
  card = turnCard(card, Face.Down);
  card = moveCard(card, Locations.Stock);
  let stock = getPile(result, Locations.Stock);
  stock = produce(stock, draft => {
    draft.cards.push(card);
  });
  result = updatePile(result, stock);
  return { game: result, actions: [], log: [] };
});

let deckGenerator: DeckGenerator = new Map<String, (value: string) => GameBoard>();
deckGenerator.set(DeckGenerators.Seed, _value => {
  return create(DefaultDeck);
});
deckGenerator.set(DeckGenerators.PreBuilt, value => {
  return create(deckFromString(value));
});

function getGameState(_game: GameBoard) {
  return GameState.InProgress;
}

export const api: GameAPI = {
  create: createAndDeal(deckGenerator),
  action: execute(actionSet),
  state: getGameState,
};
