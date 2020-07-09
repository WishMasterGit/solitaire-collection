import { Location, Game, Pile, Card, GameBoard, Face, LocationType, Suits } from './solitaireTypes';
import produce, { castDraft, Draft } from 'immer';
import _ from 'lodash';
import { turnCard, moveCard, moveCards } from './card';
export function getPile(gameBoard: GameBoard, location: Location): Pile {
  return gameBoard[location.type][location.index];
}

export function updatePile(game: Game, pile: Pile): Game {
  let piles = game.board[pile.location.type];
  piles = produce(piles, draft => {
    draft[pile.location.index] = { ...pile, cards: castDraft(pile.cards) };
  });
  return produce(game, draft => {
    draft.board[pile.location.type] = castDraft(piles);
  });
}
export function findInPile(gameBoard: GameBoard, card: Card): number {
  let pile = getPile(gameBoard, card.location).cards;
  return _.findIndex(pile, card);
}

export function removeFromPile(gameBoard: Game, card: Card): Game {
  let pile = getPile(gameBoard.board, card.location);
  let index = findInPile(gameBoard.board, card);
  pile = produce(pile, draft => {
    draft.cards.splice(index, 1);
  });
  return updatePile(gameBoard, pile);
}

export const cardToPile = produce((pile: Draft<Pile>, card: Card) => {
  pile.cards.push(card);
});

export const cardsToPile = produce((pile: Draft<Pile>, cards: readonly Card[]) => {
  pile.cards.push(...cards);
});

export function getCardFrom(game: Game, location: Location): [Card, Game] {
  let pile = getPile(game.board, location);
  let card = _(pile.cards).last() as Card;
  pile = produce(pile, draft => {
    draft.cards.pop();
  });
  return [card, updatePile(game, pile)];
}

export function moveLastCard(game: Game, from: Location, to: Location, cardFace: Face = Face.Up) {
  let [card, newGame] = getCardFrom(game, from);
  card = turnCard(card, cardFace);
  card = moveCard(card, to);
  let toPile = getPile(newGame.board, to);
  toPile = cardToPile(toPile, card);
  return updatePile(newGame, toPile);
}

export function moveSubPile(game: Game, from: Card, to: Pile) {
  let split = splitPile(game, from);
  let newGame = updatePile(game, split.rest);
  let cards = moveCards(split.sub.cards, to.location);
  let newTo = cardsToPile(to, cards);
  return updatePile(newGame, newTo);
}

export function canGetCradFrom(game: Game, location: Location) {
  let pile = getPile(game.board, location);
  return pile.cards.length > 0;
}
export function splitPile(game: Game, from: Card): { sub: Pile; rest: Pile } {
  const pile = getPile(game.board, from.location);
  const index = findInPile(game.board, from);
  const subPile = pile.cards.slice(index, pile.cards.length);
  const restOfPile = pile.cards.slice(0, index);
  return {
    sub: { cards: subPile, location: pile.location },
    rest: { cards: restOfPile, location: pile.location },
  };
}

export const asCard = (a: any): Card | undefined => {
  const comp: Card = {
    rank: 0,
    suit: Suits.clubs,
    face: 0,
    location: { index: 0, type: LocationType.Deck },
  };
  if (
    Object.keys(a)
      .sort()
      .toString() ===
    Object.keys(comp)
      .sort()
      .toString()
  ) {
    return a as Card;
  } else return undefined;
};
export const asPile = (a: any): Pile | undefined => {
  const comp: Pile = { cards: [], location: { index: 0, type: LocationType.Deck } };
  if (
    Object.keys(a)
      .sort()
      .toString() ===
    Object.keys(comp)
      .sort()
      .toString()
  ) {
    return a as Pile;
  } else return undefined;
};
export const asLocation = (a: any): Location | undefined => {
  const comp: Location = { index: 0, type: LocationType.Deck };
  if (
    Object.keys(a)
      .sort()
      .toString() ===
    Object.keys(comp)
      .sort()
      .toString()
  ) {
    return a as Location;
  } else return undefined;
};

export const as = <G extends unknown, D extends unknown>(
  arg: (Card | Location | Pile | undefined)[],
  fn: (from: G, to: D) => boolean
) => {
  const [fromCard, toCard] = arg as [G, D];
  if (fromCard && toCard) {
    return fn(fromCard, toCard);
  }
  return false;
};
