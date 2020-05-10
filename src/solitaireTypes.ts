export type Stock = {
  decks: Deck[];
};

export type Waste = {
  cards: Card[];
};

export type Tableau = {
  cards: Card[];
};

export type Deck = {
  cards: Card[];
};

export type Card = {
  rank: number;
  suit: Suits;
  face: Face;
};

export enum Suits {
  spade = 'S',
  heart = 'H',
  diamond = 'D',
  clubs = 'C',
}

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
