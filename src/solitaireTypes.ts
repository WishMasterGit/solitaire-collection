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

export enum Color {
  Red = 'Red',
  Black = 'Black',
}

export const SuitColors = new Map<Suits, Color>();
SuitColors.set(Suits.clubs, Color.Black);
SuitColors.set(Suits.spade, Color.Black);
SuitColors.set(Suits.heart, Color.Red);
SuitColors.set(Suits.diamond, Color.Red);

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
  Foundation1: {
    type: LocationType.Foundation,
    index: 1,
  },
  Foundation2: {
    type: LocationType.Foundation,
    index: 2,
  },
  Foundation3: {
    type: LocationType.Foundation,
    index: 3,
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
export type Rule = Record<
  LocationType,
  (gameBoard: GameBoard, from: Location | Card | Pile, to: Location | Card | Pile) => boolean
>;

export type Game = {
  meta: {
    type: Games;
    boardType: BoardType;
  };
  board: GameBoard;
};

export enum ActionType {
  Card = 'Card',
  Location = 'Location',
  DoubleClick = 'DoubleClick',
  Pile = 'Pile',
  Noop = 'Noop',
}
export type Action = Readonly<{
  type: ActionType;
  value: Card | Location;
}>;

export type Actions = readonly Action[];

export type ActionFunction = (game: Game, actions: Actions) => ActionResult;

export type ActionResult = {
  game: Game;
  actions: Actions;
  log: String[];
};

export type Undo = Readonly<{
  current: Game;
  stack: readonly Game[];
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

export type DeckGenerator = Map<String, (value: string) => Game>;

export enum Games {
  Accordion = 'Accordion',
  AceOfHearts = 'AceOfHearts',
  Queenie = 'Queenie',
  Yukon = 'Yukon',
  BuildDeck = 'BuildDeck',
}

export enum BoardType {
  Klondike = 'Klondike',
  Accordion = 'Accordion',
}
