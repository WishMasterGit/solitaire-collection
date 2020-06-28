import {
  Card,
  Face,
  LocationType,
  GameBoard,
  Locations,
  DeckGenerator,
  Deck,
  DeckGeneratorAction,
} from '../solitaireTypes';
import produce from 'immer';
import _ from 'lodash';
import { turnCard, moveCard } from '../card';
import { getPile, updatePile } from '../gameBoard';

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

export function selectCard(game: GameBoard, index: number): [number, Card] {
  const tableau = getPile(game, Locations.Tableau0);
  return [index, tableau.cards[index]];
}

export function canMoveCard(
  game: GameBoard,
  from: number,
  to: number
): [boolean, Card, Card] {
  let indexDiff = from - to;
  let tableau = getPile(game, Locations.Tableau0);
  let fromCard = tableau.cards[from];
  let toCard = tableau.cards[to];
  if (indexDiff === 3 || indexDiff === 1) {
    if (fromCard.suit === toCard.suit || fromCard.rank === toCard.rank) {
      return [true, fromCard, toCard];
    }
  }
  return [false, fromCard, toCard];
}
export function moveCardTo(
  game: GameBoard,
  from: number,
  to: number
): [boolean, GameBoard] {
  let [canMove, fromCard, toCard] = canMoveCard(game, from, to);
  if (!canMove) return [true, game];
  fromCard = moveCard(fromCard, {
    index: 0,
    type: LocationType.Tableau,
  });
  toCard = moveCard(fromCard, {
    index: 0,
    type: LocationType.Tableau,
  });
  let tableau = getPile(game, Locations.Tableau0);
  tableau = produce(tableau, draft => {
    draft.cards.splice(to, 1, fromCard);
  });
  tableau = produce(tableau, draft => {
    draft.cards.splice(from, 1);
  });
  let waste = getPile(game, Locations.Waste0);
  waste = produce(waste, draft => {
    draft.cards.push(toCard);
  });
  game = updatePile(game, tableau);
  game = updatePile(game, waste);
  return [true, game];
}

export function anyMovesLeft(game: GameBoard): [boolean, number, number] {
  let tableau = getPile(game, Locations.Tableau0).cards;
  for (let i = 3; i < tableau.length; i++) {
    const [canMove] = canMoveCard(game, i, i - 3);
    if (canMove) {
      return [true, i, i - 3];
    }
  }
  return [false, -1, -1];
}

