import { GameBoard, Actions, ActionResult, DeckGeneratorAction, GameState } from 'solitaireTypes';
import { api as accordion } from './games/accordionAPI';
import { api as aceOfHearts } from './games/aceOfHeartsAPI';
import { api as buildDeck } from './games/buildDeckAPI';

export enum Games {
  Accordion = 'Accordion',
  AceOfHearts = 'AceOfHearts',

  BuildDeck = 'BuildDeck',
}

export interface GameAPI {
  create: (generator: DeckGeneratorAction) => GameBoard;
  action: (game: GameBoard, actions: Actions) => ActionResult;

  state: (game: GameBoard) => GameState;
}

let gameAPI = new Map<Games, GameAPI>();
gameAPI.set(Games.Accordion, accordion);
gameAPI.set(Games.AceOfHearts, aceOfHearts);
gameAPI.set(Games.BuildDeck, buildDeck);

export { gameAPI };
