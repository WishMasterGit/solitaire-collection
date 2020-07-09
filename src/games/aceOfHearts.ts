import {
  Card,
  Game,
  LocationType,
  Suits,
  Rank,
  Deck,
  Locations,
  Games,
  Pile,
} from '../solitaireTypes';
import _ from 'lodash';
import { moveCards } from '../card';
import { getPile, as, asCard, asPile } from '../gameBoard';
import { check, is, CaseType, match } from '../funcUtils';
export const createGame = (deck: Deck): Game => {
  let game: Game = {
    meta: { type: Games.AceOfHearts },
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
      [LocationType.Foundation]: [{ cards: [], location: Locations.Foundation0 }],
      [LocationType.Waste]: [{ cards: [], location: Locations.Waste0 }],
      [LocationType.Deck]: [],
    },
    rules: {
      [LocationType.Stock]: (_game, _from, _to): boolean => false,
      [LocationType.Tableau]: (_game, from, to): boolean => {
        return match(
          as([asCard(from), asCard(to)], (fromCard: Card, toCard: Card): boolean => {
            return (
              fromCard.location !== toCard.location &&
              toCard.rank - fromCard.rank === 1 &&
              toCard.suit === fromCard.suit
            );
          }),
          as([asCard(from), asPile(to)], (fromCard: Card, toPile: Pile) => {
            return check(outsideOfTableau, fromCard, toPile)
              .chainLeft(is(emptyPileOrKing, fromCard, toPile))
              .chainLeft(is(pileWithCards, _(toPile.cards).last() as Card, fromCard, toPile))
              .orDefault(false);
          })
        );
      },
      [LocationType.Waste]: (_game, _from, _to): boolean => false,
      [LocationType.Foundation]: (gameBoard, from, to): boolean => {
        return match(
          as([asCard(from), asPile(to)], (fromCard: Card, toPile: Pile): boolean => {
            return check(
              notFromTableauToFoundation,
              fromCard,
              toPile,
              getPile(gameBoard, fromCard.location)
            )
              .chainLeft(is(emptyFoundation, fromCard, toPile))
              .chainLeft(is(notEmptyFoundation, fromCard, toPile, _(toPile.cards).last() as Card))
              .orDefault(false);
          })
        );
      },
      [LocationType.Deck]: (_game, _from, _to): boolean => false,
    },
  };
  return game;
};

const outsideOfTableau: CaseType = [
  (fromCard: Card, toPile: Pile) =>
    fromCard.location.type !== LocationType.Tableau &&
    toPile.location.type !== LocationType.Tableau,
  false,
];
const emptyPileOrKing: CaseType = [
  (fromCard: Card, toPile: Pile) => toPile.cards.length === 0 && fromCard.rank === Rank.K,
  true,
];
const pileWithCards: CaseType = [
  (lastCard: Card, fromCard: Card, toPile: Pile) =>
    toPile.cards.length !== 0 &&
    fromCard.location !== lastCard.location &&
    lastCard.rank - fromCard.rank === 1 &&
    lastCard.suit === fromCard.suit,
  true,
];

const notFromTableauToFoundation: CaseType = [
  (fromCard: Card, toPile: Pile, fromCardPile: Pile) =>
    fromCard.location.type !== LocationType.Tableau &&
    toPile.location.type !== LocationType.Foundation &&
    fromCard !== _.last(fromCardPile.cards),
  false,
];
const emptyFoundation: CaseType = [
  (fromCard: Card, toPile: Pile) =>
    toPile.cards.length === 0 && fromCard.suit === Suits.heart && fromCard.rank === Rank.A,
  true,
];
const notEmptyFoundation: CaseType = [
  (fromCard: Card, toPile: Pile, lastCard: Card) =>
    toPile.cards.length !== 0 &&
    (lastCard.rank - fromCard.rank === 1 || (lastCard.rank === Rank.K && fromCard.rank === Rank.A)),
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
    if (
      game.rules[LocationType.Foundation](
        game.board,
        lastCard,
        getPile(game.board, Locations.Foundation0)
      )
    ) {
      return [true, undefined, lastCard];
    }
    for (let card of allCards) {
      if (game.rules[LocationType.Tableau](game.board, card, lastCard)) {
        return [true, card, lastCard];
      }
    }
  }

  return [false, undefined, undefined];
}
