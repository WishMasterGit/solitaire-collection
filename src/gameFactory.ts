import { GameBoard, Actions, ActionResult } from 'solitaireTypes';
import { api as accordion } from './games/accordion';
import { api as aceOfHearts } from './games/aceOfHearts';
import { api as buildDeck} from './games/buildDeck';

export enum Games {
  Accordion = 'Accordion',
  AceOfHearts = 'AceOfHearts',

  BuildDeck = 'BuildDeck'
}

export interface GameAPI {
  create: (seed: string) => GameBoard;
  action: (game: GameBoard, actions: Actions) => ActionResult;
}

let gameAPI = new Map<Games, GameAPI>();
gameAPI.set(Games.Accordion, accordion);
gameAPI.set(Games.AceOfHearts, aceOfHearts);
gameAPI.set(Games.BuildDeck, buildDeck )

export { gameAPI };
