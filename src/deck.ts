import { Suits, Rank, Card, Face, Deck, makeCard, makeDeck } from './solitaireTypes';
import seedrandom from 'seedrandom';
import {List} from 'immutable'
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

function fisherYates(arr: List<any>, seed = 'default'): List<any> {
  let random = seedrandom(seed);
  let i = arr.size;
  while (--i) {
    let j = Math.floor(random() * (i + 1));
    let tempi = arr.get(i);
    let tempj = arr.get(j);
    arr = arr.set(i,tempj) 
    arr = arr.set(j,tempi) 
  }
  return arr;
}

let zipSuitesAndRanks = (): List<Card> => {
  let result: Card[] = [];
  suites.forEach(suit => {
    let set: Card[] = ranks.map(rank => {
      return makeCard({
        rank: rank,
        suit: suit,
        face: Face.Down,
      });
    });
    result.push(...set);
  });
  return List<Card>(result);
}; //resultay shuffling algorithm: http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const DefaultDeck: Deck = makeDeck({
  cards: zipSuitesAndRanks(),
});

export const shuffleDeck = (deck: Deck, seed = 'default'): Deck => {
  let cards = deck.cards;
  return makeDeck({
    cards: fisherYates(cards, seed),
  });
};

export const cardHash = (card: Card): string => {
  if (card.face === Face.Down) return 'c1B';
  return `c${card.rank}${card.suit}`;
};
