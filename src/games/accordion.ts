import {
  Card,
  LocationType,
  Game,
  Locations,
  Deck,
  Games,
  GameBoard 
} from '../solitaireTypes';
import produce from 'immer';
import _ from 'lodash';
import { moveCard } from '../card';
import { getPile, updatePile, as, asCard, findInPile } from '../gameBoard';

export let create = (deck: Deck): Game => {
  let game: Game = {
    meta: {
      type: Games.Accordion
    },
    board: {
      [LocationType.Stock]: [{ cards: deck.cards, location: Locations.Stock }],
      [LocationType.Tableau]: [{ cards: [], location: Locations.Tableau0 }],
      [LocationType.Waste]: [{ cards: [], location: Locations.Waste0 }],
      [LocationType.Foundation]: [],
      [LocationType.Deck]: [],
    },
    rules: {
      [LocationType.Stock]: (_from,_to):boolean=>false,
      [LocationType.Tableau]: (gameBoard, from,to):boolean=>{
          return [as([asCard(from), asCard(to)], (fromCard: Card, toCard: Card): boolean => {
            return canMoveCard(gameBoard,fromCard,toCard)
          })]
          .reduce((a, b) => a || b)
      },
      [LocationType.Waste]: (_from,_to):boolean=>false,
      [LocationType.Foundation]: (_from,_to):boolean=>false,
      [LocationType.Deck]: (_from,_to):boolean=>false,
    }
  };
  return game;
};


export function selectCard(game: Game, index: number): [number, Card] {
  const tableau = getPile(game.board, Locations.Tableau0);
  return [index, tableau.cards[index]];
}

export function canMoveCard(gameBoard: GameBoard, fromCard: Card, toCard: Card): boolean {
  const from = findInPile(gameBoard, fromCard);
  const to = findInPile(gameBoard, toCard);
  let indexDiff = from - to;
  if (indexDiff === 3 || indexDiff === 1) {
    if (fromCard.suit === toCard.suit || fromCard.rank === toCard.rank) {
      return true;
    }
  }
  return false;
}

export function moveCardTo(game: Game, fromCard: Card, toCard: Card): Game {
  const from = findInPile(game.board, fromCard);
  const to = findInPile(game.board, toCard);
  fromCard = moveCard(fromCard, Locations.Tableau0);
  toCard = moveCard(fromCard, Locations.Tableau0);
  let tableau = getPile(game.board, Locations.Tableau0);
  tableau = produce(tableau, draft => { draft.cards.splice(to, 1, fromCard); });
  tableau = produce(tableau, draft => { draft.cards.splice(from, 1); });
  let waste = getPile(game.board, Locations.Waste0);
  waste = produce(waste, draft => { draft.cards.push(toCard); });
  game = updatePile(game, tableau);
  game = updatePile(game, waste);
  return game;
}

export function anyMovesLeft(game: Game): [boolean, number, number] {
  let tableau = getPile(game.board, Locations.Tableau0).cards;
  for (let i = 3; i < tableau.length; i++) {
    const canMove = canMoveCard(game.board, tableau[i], tableau[i - 3]);
    if (canMove) {
      return [true, i, i - 3];
    }
  }
  return [false, -1, -1];
}
