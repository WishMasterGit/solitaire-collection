import {
  GameBoard,
  LocationType,
  Locations,
  Card,
  Face,
  Deck,
  DeckGeneratorAction,
  DeckGenerator,
} from '../solitaireTypes';
import { getPile, updatePile } from '../gameBoard';
import _ from 'lodash';
import { turnCard, moveCard } from '../card';
import produce from 'immer';

export let create = (deck: Deck): GameBoard => {
  let game: GameBoard = {
    [LocationType.Stock]: [
      {
        cards: deck.cards,
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
        cards: [],
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

export const createAndDeal = _.curry(
  (deckGenerator: DeckGenerator, action: DeckGeneratorAction): GameBoard => {
    const game = deckGenerator.get(action.type)?.(action.value);
    return autoDeal(game as GameBoard);
  }
);
