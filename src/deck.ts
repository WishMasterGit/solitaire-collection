import { Suits, Rank, Card, Face, Deck, LocationType } from './solitaireTypes';
import seedrandom from 'seedrandom';
import produce from 'immer';
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

function fisherYates(arr: Card[], seed = 'default'): Card[] {
  let random = seedrandom(seed);
  let i = arr.length;
  while (--i) {
    let j = Math.floor(random() * (i + 1));
    let tempi = produce(arr[i], draft => {
      draft.location.index = j;
    });
    let tempj = produce(arr[j], draft => {
      draft.location.index = j;
    });
    arr[i] = tempj;
    arr[j] = tempi;
  }
  return arr;
}

let zipSuitesAndRanks = (): Card[] => {
  let result: Card[] = [];
  let indexCounter = 0;
  suites.forEach(suit => {
    let set: Card[] = ranks.map(rank => {
      return {
        rank: rank,
        suit: suit,
        face: Face.Down,
        location: {
          pileIndex: indexCounter,
          index: 0,
          type: LocationType.Deck,
        },
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
  return produce(deck, draft => {
    draft.cards = fisherYates(draft.cards, seed);
  });
};
