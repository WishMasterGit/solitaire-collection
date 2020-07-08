import { Card, Game, LocationType, Suits, Rank, Deck, Locations, Games, Pile, } from '../solitaireTypes';
import _ from 'lodash';
import { moveCards } from '../card';
import { getPile, as, asCard, asPile } from '../gameBoard';

export const createGame = (deck: Deck): Game => {
  let game: Game =
  {
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
      [LocationType.Foundation]: [
        { cards: [], location: Locations.Foundation0 },
      ],
      [LocationType.Waste]: [
        { cards: [], location: Locations.Waste0 },
      ],
      [LocationType.Deck]: [],
    },
    rules: {
      [LocationType.Stock]: (_game, _from, _to): boolean => false,
      [LocationType.Tableau]: (_game, from, to): boolean => {
        return [
          as([asCard(from), asCard(to)], (fromCard: Card, toCard: Card): boolean => {
            //should be obsolete
            return fromCard.location !== toCard.location
              && toCard.rank - fromCard.rank === 1
              && toCard.suit === fromCard.suit
          }),

          as([asCard(from), asPile(to)], (fromCard: Card, toPile: Pile) => {

            if (fromCard.location.type !== LocationType.Tableau &&
                toPile.location.type !== LocationType.Tableau) 
              { return false }

            if (toPile.cards.length === 0 && fromCard.rank === Rank.K) 
            { return true }
            else if (toPile.cards.length !== 0) {
              const lastCard = _(toPile.cards).last() as Card

              if (fromCard.location !== lastCard.location
                && lastCard.rank - fromCard.rank === 1
                && lastCard.suit === fromCard.suit) {
                return true
              }
            }

            return false
          })]
          .reduce((a, b) => a || b)
      },
      [LocationType.Waste]: (_game, _from, _to): boolean => false,
      [LocationType.Foundation]: (gameBoard, from, to): boolean => {
        return [
          as([asCard(from), asPile(to)], (fromCard: Card, toPile: Pile): boolean => {
            const fromCardPile = getPile(gameBoard, fromCard.location);
            if (fromCard.location.type !== LocationType.Tableau &&
              toPile.location.type !== LocationType.Foundation &&
              fromCard === _.last(fromCardPile.cards)
            ) {
              return false
            }

            if (toPile.cards.length === 0 && fromCard.suit === Suits.heart && fromCard.rank === Rank.A) {
              return true
            } else if (toPile.cards.length !== 0) {
              const lastCard = _(toPile.cards).last() as Card
              if (lastCard.rank - fromCard.rank === 1 || (lastCard.rank === Rank.K && fromCard.rank === Rank.A)) {
                return true
              }
            }
            return false

          }),
        ]
        .reduce((a, b) => a || b)
      },
      [LocationType.Deck]: (_game, _from, _to): boolean => false,
    }
  };
  return game;
};


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
    if (game.rules[LocationType.Foundation](game.board, lastCard, getPile(game.board, Locations.Foundation0))) {
      return [true, undefined, lastCard]
    }
    for (let card of allCards) {
      if (game.rules[LocationType.Tableau](game.board, card, lastCard)) {
        return [true, card, lastCard];
      }
    }
  }

  return [false, undefined, undefined];
}
