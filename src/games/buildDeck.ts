import { GameBoard, LocationType, Locations, Card, Face, ActionFunction, Actions, ActionType } from '../solitaireTypes';
import { DefaultDeck, shuffleDeck } from '../deck';
import { GameAPI } from '../gameFactory';
import { getPile, updatePile, removeFromPile } from '../gameBoard';
import _ from 'lodash';
import { turnCard, moveCard } from '../card';
import produce from 'immer';
import { execute, setDefault, actionsTypeHash } from '../action';

export let create = (seed = 'default'): GameBoard => {
  let game: GameBoard = {
    [LocationType.Stock]: [
      {
        cards: shuffleDeck(DefaultDeck, seed).cards,
        location: {
          type: LocationType.Stock,
          index: 0,
        },
      },
    ],
    [LocationType.Tableau]: [
      {
        cards: [],
        location: {
          type: LocationType.Tableau,
          index: 0,
        },
      },
    ],
    [LocationType.Waste]: [
      {
        cards: shuffleDeck(DefaultDeck, seed).cards,
        location: {
          type: LocationType.Waste,
          index: 0,
        },
      },
    ],
    [LocationType.Foundation]: [],
    [LocationType.Deck]: [],
  };

  return game;
};

export function stockClick(game: GameBoard): [Card, GameBoard] {
  let stock = getPile(game, Locations.Stock);
  let tableau = getPile(game, Locations.Tableau0);
  let card = _(stock.cards).last() as Card;
  card = turnCard(card, Face.Up);
  card = moveCard(card, Locations.Tableau0);
  stock = produce(stock, draft => {
    draft.cards.pop();
  });
  tableau = produce(tableau, draft => {
    draft.cards.push(card);
  });
  game = updatePile(game, stock);
  game = updatePile(game, tableau);
  return [card, game];
}
export function autoDeal(game: GameBoard): GameBoard {
  let stock = getPile(game, Locations.Stock);
  while (stock.cards.length > 0) {
    game = stockClick(game)[1];
    stock = getPile(game, Locations.Stock);
  }
  return game;
}
export function createAndDeal(seed: string): GameBoard {
  const game = create(seed);
  return autoDeal(game);
}

let actionSet = new Map<String, ActionFunction>();

setDefault(actionSet, (game: GameBoard, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    let card = actions[0].value as Card;
    let result = removeFromPile(game,card)
    card = turnCard(card, Face.Down);
    card = moveCard(card, Locations.Stock);
    let stock = getPile(result, Locations.Stock);
    stock = produce(stock, draft => {
      draft.cards.push(card);
    });
    result = updatePile(result, stock);
    return { game: result, actions: [], log: [] };
  }
);

export const api: GameAPI = {
  create: createAndDeal,
  action: execute(actionSet),
};