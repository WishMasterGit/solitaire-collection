import { LocationType, GameBoard, Pile, Card } from 'solitaireTypes';
import produce, { castDraft } from 'immer';
import _ from 'lodash';
export function getPile(
  gameBoard: GameBoard,
  location: LocationType,
  index: number
): Pile {
  return gameBoard[location][index];
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
  let pile = getPile(gameBoard, card.location.type, card.location.index).cards;
  return _.findIndex(pile, card);
}

export function removeFromPile(gameBoard: GameBoard, card: Card): GameBoard {
  let pile = getPile(gameBoard, card.location.type, card.location.index);
  pile = produce(pile, draft => {
    draft.cards.splice(card.location.index, 1);
  });
  return updatePile(gameBoard, pile);
}
