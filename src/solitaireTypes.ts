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

export const Locations = {
  Stock: {
    type: LocationType.Stock,
    index: 0,
  },

  Foundation0: {
    type: LocationType.Foundation,
    index: 0,
  },
  Tableau0: {
    type: LocationType.Tableau,
    index: 0,
  },
  Tableau1: {
    type: LocationType.Tableau,
    index: 1,
  },
  Tableau2: {
    type: LocationType.Tableau,
    index: 2,
  },
  Tableau3: {
    type: LocationType.Tableau,
    index: 3,
  },
  Tableau4: {
    type: LocationType.Tableau,
    index: 4,
  },
  Tableau5: {
    type: LocationType.Tableau,
    index: 5,
  },
  Tableau6: {
    type: LocationType.Tableau,
    index: 6,
  },
  Waste0: {
    type: LocationType.Waste,
    index: 0,
  },
};

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

export enum ActionType {
  Card = 'Card',
  Location = 'Location',
  Noop = 'Noop',
}
export type Action = Readonly<{
  type: ActionType;
  value: Card | Location;
}>;

export type Actions = readonly Action[];

export type ActionFunction = (game: GameBoard, actions: Actions) => ActionResult;

export type ActionResult = {
  game: GameBoard;
  actions: Actions;
  log: [];
};

export type Undo = Readonly<{
  current: GameBoard;
  stack: readonly GameBoard[];
}>;

export enum GameState {
  InProgress = 'in progress',
  NoMoreMoves = 'no more moves',
  GameOver = 'game over',
}

export enum DeckGenerators {
  Seed = 'seed',
  PreBuilt = 'prebuilt',
}

export type DeckGeneratorAction = Readonly<{
  type: DeckGenerators;
  value: string;
}>;

export type DeckGenerator = Map<String, (value: string) => GameBoard>;
