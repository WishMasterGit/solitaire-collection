import { Suits, Rank, Card, Face, Deck } from './solitaireTypes';
import zip from 'lodash/zip';
import clone from 'lodash/clone';
import seedrandom from 'seedrandom';

let suites: Suits[] = [
  Suits.clubs,
  Suits.diamond,
  Suits.heart,
  Suits.clubs,
].flatMap(n => Array(13).fill(n));

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
].flatMap(n => Array(4).fill(n));

let zipSuitesAndRanks: [number, Suits][] = zip(ranks, suites) as [
  number,
  Suits
][];

//resultay shuffling algorithm: http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
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
export const DefaultDeck: Deck = {
  cards: zipSuitesAndRanks.map(
    (item: [number, Suits]): Card => {
      let card: Card = {
        rank: item[0] as number,
        suit: item[1],
        face: Face.Down,
      };
      return card;
    }
  ),
};

export const shuffleDeck = (deck: Deck, seed="default"): Deck => {
  let cards = deck.cards;
  return {
    cards: fisherYates(cards,seed),
  };
};
