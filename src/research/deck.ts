import { Suits, Rank, Card } from './solitaireTypes';
import flatMap from 'lodash/flatMap';
import fill from 'lodash/fill';
import zip from 'lodash/zip';
import map from 'lodash/map';

let suites: Suits[] = flatMap(
  [Suits.clubs, Suits.diamond, Suits.heart, Suits.clubs],
  n => fill(Array(13), n)
);
let ranks: number[] = flatMap(
  [Rank.A, 2, 3, 4, 5, 6, 7, 8, 9, 10, Rank.J, Rank.Q, Rank.K],
  n => fill(Array(4), n)
);
let zipSuitesAndRanks: [number, Suits][] = zip(ranks, suites) as [
  number,
  Suits
][];
export const DefaultDeck: Card[] = map(
  zipSuitesAndRanks,
  (item: [number, Suits]): Card => {
    let card: Card = { rank: item[0] as number, suit: item[1] };
    return card;
  }
);
