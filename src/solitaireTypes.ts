import {Record, RecordOf, List} from 'immutable'

export enum Rank {
  J = 11,
  Q = 12,
  K = 13,
  A = 1,
}

export enum Face {
  Up = 1,
  Down = 0,
}
export enum Suits {
  spade = 'S',
  heart = 'H',
  diamond = 'D',
  clubs = 'C',
}
export type Stock = {
  decks: Deck[];
};

export type Waste = {
  cards: Card[];
};

export type Tableau = {
  cards: Card[];
};

export type Foundation = {
  cards: Card[];
}

export type Deck = RecordOf<{
  cards: List<Card>;
}>;
export const makeDeck = Record({cards:List<Card>()})
export type Card = RecordOf<{
  rank: number;
  suit: Suits;
  face: Face;
}>;

export const makeCard = Record({rank:0, suit:Suits.clubs, face:Face.Down})
