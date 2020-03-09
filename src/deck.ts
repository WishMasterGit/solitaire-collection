import { Suits, Rank, Card, Face, Deck } from './solitaireTypes';
import clone from 'lodash/clone';
import seedrandom from 'seedrandom';

let suites: Suits[] = [Suits.spade, Suits.diamond, Suits.heart, Suits.clubs];

let ranks: number[] = [
  Rank.A,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  Rank.J,
  Rank.Q,
  Rank.K,
];

function fisherYates(arr: any[], seed = 'default'): any[] {
  let random = seedrandom(seed);
  let result = clone(arr);
  let i = result.length;
  while (--i) {
    let j = Math.floor(random() * (i + 1));
    let tempi = result[i];
    let tempj = result[j];
    result[i] = tempj;
    result[j] = tempi;
  }
  return result;
}

let zipSuitesAndRanks = (): Card[] => {
  let result: Card[] = [];
  suites.forEach(suit => {
    let set: Card[] = ranks.map(rank => {
      return {
        rank: rank,
        suit: suit,
        face: Face.Down,
      };
    });
    result.push(...set);
  });
  return result;
}; //resultay shuffling algorithm: http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const DefaultDeck: Deck = {
  cards: zipSuitesAndRanks(),
};

export const shuffleDeck = (deck: Deck, seed = 'default'): Deck => {
  let cards = deck.cards;
  return {
    cards: fisherYates(cards, seed),
  };
};
