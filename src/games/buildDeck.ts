import {
  Game,
  LocationType,
  Locations,
  Card,
  Face,
  Deck,
  DeckGeneratorAction,
  DeckGenerator,
  Games,
} from '../solitaireTypes';
import { getPile, updatePile } from '../gameBoard';
import _ from 'lodash';
import { turnCard, moveCard } from '../card';
import produce from 'immer';

export let create = (deck: Deck): Game => {
  let game: Game = {
    meta: {
      type: Games.BuildDeck,
    },
    board: {
      [LocationType.Stock]: [{ cards: deck.cards, location: Locations.Stock }],
      [LocationType.Tableau]: [{ cards: [], location: Locations.Tableau0 }],
      [LocationType.Waste]: [{ cards: [], location: Locations.Waste0 }],
      [LocationType.Foundation]: [],
      [LocationType.Deck]: [],
    },
  };

  return game;
};

export function stockClick(game: Game): [Card, Game] {
  let stock = getPile(game.board, Locations.Stock);
  let tableau = getPile(game.board, Locations.Tableau0);
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
export function autoDeal(game: Game): Game {
  let stock = getPile(game.board, Locations.Stock);
  while (stock.cards.length > 0) {
    game = stockClick(game)[1];
    stock = getPile(game.board, Locations.Stock);
  }
  return game;
}

export const createAndDeal = _.curry(
  (deckGenerator: DeckGenerator, action: DeckGeneratorAction): Game => {
    const game = deckGenerator.get(action.type)?.(action.value);
    return autoDeal(game as Game);
  }
);
