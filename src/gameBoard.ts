import { Location, GameBoard, Pile, Card, Face } from './solitaireTypes';
import produce, { castDraft, Draft } from 'immer';
import _ from 'lodash';
import { turnCard, moveCard, moveCards } from './card';
export function getPile(gameBoard: GameBoard, location: Location): Pile {
  return gameBoard[location.type][location.index];
}

export function updatePile(gameBoard: GameBoard, pile: Pile): GameBoard {
  let piles = gameBoard[pile.location.type];
  piles = produce(piles, draft => {
    draft[pile.location.index] = { ...pile, cards: castDraft(pile.cards) };
  });
  return produce(gameBoard, draft => {
    draft[pile.location.type] = castDraft(piles);
  });
}
export function findInPile(gameBoard: GameBoard, card: Card): number {
  let pile = getPile(gameBoard, card.location).cards;
  return _.findIndex(pile, card);
}

export function removeFromPile(gameBoard: GameBoard, card: Card): GameBoard {
  let pile = getPile(gameBoard, card.location);
  let index = findInPile(gameBoard, card);
  pile = produce(pile, draft => {
    draft.cards.splice(index, 1);
  });
  return updatePile(gameBoard, pile);
}

export const cardToPile = produce((pile: Draft<Pile>, card: Card) => {
  pile.cards.push(card);
});

export const cardsToPile = produce(
  (pile: Draft<Pile>, cards: readonly Card[]) => {
    pile.cards.push(...cards);
  }
);

export function getCardFrom(
  game: GameBoard,
  location: Location
): [Card, GameBoard] {
  let pile = getPile(game, location);
  let card = _(pile.cards).last() as Card;
  pile = produce(pile, draft => {
    draft.cards.pop();
  });
  return [card, updatePile(game, pile)];
}

export function moveLastCard(game: GameBoard, from: Location, to: Location, cardFace: Face = Face.Up) {
  let [card, newGame] = getCardFrom(game, from);
  card = turnCard(card, cardFace);
  card = moveCard(card, to);
  let toPile = getPile(newGame, to)
  toPile = cardToPile(toPile, card);
  return updatePile(newGame, toPile)
}

export function moveSubPile(game: GameBoard, from: Card, to: Pile) {
  let split = splitPile(game, from);
  let newGame = updatePile(game, split.rest);
  let cards = moveCards(split.sub.cards, to.location);
  let newTo = cardsToPile(to, cards);
  return updatePile(newGame, newTo)
}

export function canGetCradFrom(game: GameBoard, location: Location) {
  let pile = getPile(game, location);
  return pile.cards.length > 0;
}
export function splitPile(
  game: GameBoard,
  from: Card
): { sub: Pile; rest: Pile } {
  const pile = getPile(game, from.location);
  const index = findInPile(game, from);
  const subPile = pile.cards.slice(index, pile.cards.length);
  const restOfPile = pile.cards.slice(0, index);
  return {
    sub: { cards: subPile, location: pile.location },
    rest: { cards: restOfPile, location: pile.location },
  };
}
