import {
  Game,
  LocationType,
  Deck,
  Locations,
  Games,
  Card,
  Rule,
  Pile,
  Rank,
  SuitColors,
  BoardType,
} from '../solitaireTypes';
import { moveCards } from '../card';
import { CaseType, match, check, is } from '../funcUtils';
import _ from 'lodash';
import { asCard, as, asPile, getPile } from '../gameBoard';

export const createGame = (deck: Deck): Game => {
  let game: Game = {
    meta: {
      type: Games.Queenie,
      boardType: BoardType.Klondike,
    },
    board: {
      [LocationType.Stock]: [
        {
          cards: moveCards(deck.cards, Locations.Stock),
          location: Locations.Stock,
        },
      ],
      [LocationType.Tableau]: [
        { cards: [], location: Locations.Tableau0 },
        { cards: [], location: Locations.Tableau1 },
        { cards: [], location: Locations.Tableau2 },
        { cards: [], location: Locations.Tableau3 },
        { cards: [], location: Locations.Tableau4 },
        { cards: [], location: Locations.Tableau5 },
        { cards: [], location: Locations.Tableau6 },
      ],
      [LocationType.Foundation]: [
        { cards: [], location: Locations.Foundation0 },
        { cards: [], location: Locations.Foundation1 },
        { cards: [], location: Locations.Foundation2 },
        { cards: [], location: Locations.Foundation3 },
      ],
      [LocationType.Waste]: [{ cards: [], location: Locations.Waste0 }],
      [LocationType.Deck]: [],
    },
  };
  return game;
};

export const rules: Rule = {
  [LocationType.Stock]: (_game, _from, _to): boolean => false,
  [LocationType.Tableau]: (_game, from, to): boolean => {
    return match(
      as([asCard(from), asPile(to)], (fromCard: Card, toPile: Pile) => {
        return check(outsideOfTableau, fromCard, toPile)
          .chainLeft(is(emptyPileOrKing, fromCard, toPile))
          .chainLeft(is(pileWithCards, _(toPile.cards).last() as Card, fromCard, toPile))
          .orDefault(false);
      })
    );
  },
  [LocationType.Waste]: (_game, _from, _to): boolean => false,
  [LocationType.Foundation]: (game, from, to): boolean => {
    return match(
      as([asCard(from), asPile(to)], (fromCard: Card, toPile: Pile): boolean => {
        return check(notFromTableauToFoundation, fromCard, toPile, getPile(game, fromCard.location))
          .chainLeft(is(emptyFoundation, fromCard, toPile))
          .chainLeft(is(notEmptyFoundation, fromCard, toPile, _(toPile.cards).last() as Card))
          .orDefault(false);
      })
    );
  },
  [LocationType.Deck]: (_game, _from, _to): boolean => false,
};

const outsideOfTableau: CaseType = [
  (fromCard: Card, toPile: Pile) =>
    fromCard.location.type !== LocationType.Tableau ||
    toPile.location.type !== LocationType.Tableau,
  false,
];

//Empty spaces in the tableau may be filled by kings only.
const emptyPileOrKing: CaseType = [
  (fromCard: Card, toPile: Pile) => toPile.cards.length === 0 && fromCard.rank === Rank.K,
  true,
];

/*
A card may be added onto a tableau pile if it is one lower than 
the old top card of the pile and of the opposite color.
Thus, the cards that could be played on Q♠ would be J♥ or J♦.

Cards on the tableau that are not under another card are available 
for play onto the foundation or any other tableau pile.

Furthermore, any face-up card anywhere in the tableau may be moved to another 
tableau column where it fits, taking all cards that were on top of it along.
*/
const pileWithCards: CaseType = [
  (lastCard: Card, fromCard: Card, toPile: Pile) =>
    toPile.cards.length !== 0 &&
    fromCard.location !== lastCard.location &&
    lastCard.rank - fromCard.rank === 1 &&
    SuitColors.get(lastCard.suit) !== SuitColors.get(fromCard.suit),
  true,
];

//Foundation
const notFromTableauToFoundation: CaseType = [
  (fromCard: Card, toPile: Pile, fromCardPile: Pile) =>
    (fromCard.location.type !== LocationType.Tableau ||
      toPile.location.type !== LocationType.Foundation) &&
    fromCard !== _.last(fromCardPile.cards),
  false,
];

// Any ace may be moved to any empty pile in the foundation.
const emptyFoundation: CaseType = [
  (fromCard: Card, toPile: Pile) => toPile.cards.length === 0 && fromCard.rank === Rank.A,
  true,
];

// A card may be added onto a foundation pile if it is one higher
// than the old top card of the pile and of the same suit.
// Thus, the only card that could be played on a 7♣ would be an 8♣.
const notEmptyFoundation: CaseType = [
  (fromCard: Card, toPile: Pile, lastCard: Card) =>
    toPile.cards.length !== 0 &&
    fromCard.rank - lastCard.rank === 1 &&
    lastCard.suit === fromCard.suit,
  true,
];

export function anyMovesLeft(game: Game): [boolean, Card | undefined, Card | undefined] {
  const lastCards = game.board.tableau
    .map(t => _.last(t.cards))
    .reduce((a, c) => {
      if (c) {
        a.push(c);
      }
      return a;
    }, new Array<Card>());

  const allCards = game.board.tableau.flatMap(t => t.cards);

  for (let lastCard of lastCards) {
    const canMoveToFoundations = game.board.foundation.reduce((a, c) => {
      let pile = getPile(game.board, c.location);
      return a && rules[c.location.type](game.board, lastCard, pile);
    }, true);

    if (canMoveToFoundations) {
      return [true, undefined, lastCard];
    }
    for (let card of allCards) {
      if (rules[LocationType.Tableau](game.board, card, lastCard)) {
        return [true, card, lastCard];
      }
    }
  }

  return [false, undefined, undefined];
}
