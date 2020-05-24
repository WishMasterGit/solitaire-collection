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
  Foundation = 'foundation',
  Waste = 'waste',
}

export type Pile = Readonly<{
  cards: Readonly<Array<Card>>;
  location: Location;
}>;

export type Deck = Readonly<{
  cards: readonly Card[];
}>;
export type Card = Readonly<{
  rank: number;
  suit: Suits;
  face: Face;
  location: Location;
}>;

export type Location = Readonly<{
  index: number;
  type: LocationType;
}>;

export type GameBoard = Record<LocationType, Pile[]>;

export enum ActionType{
  Card="Card",
  Location="Location",
  Noop = "Noop"
}
export type Action = Readonly<{
  type:ActionType
  value: Card | Location;
}>;

export type Actions = readonly Action[];

export type ActionFunction = (game: GameBoard, actions: Actions) => ActionResult

export type ActionResult = {
  game:GameBoard,
  actions:Actions
  log:[]
}
