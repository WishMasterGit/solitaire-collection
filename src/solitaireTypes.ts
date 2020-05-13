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

export enum LocationType {
  Deck = 'deck',
  Stock = 'stock',
  Tableau = 'tableau',
  Foundation = 'foundation'
}
export type Stock = Readonly<{
  decks: readonly Deck[];
}>;

export type Waste = Readonly<{
  cards: readonly Card[];
}>;

export type Tableau = Readonly<{
  cards: readonly Card[];
  index:number;
}>;

export type Foundation = Readonly<{
  cards: readonly Card[];
}>;

export type Deck = Readonly<{
  cards: readonly Card[];
}>;
export type Card = Readonly<{
  rank: number;
  suit: Suits;
  face: Face;
  location:Location;
}>;

export type Location = Readonly<{
  pileIndex:number;
  index:number;
  type: LocationType;
}>
