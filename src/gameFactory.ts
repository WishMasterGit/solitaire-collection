import { GameBoard, Actions, ActionResult } from 'solitaireTypes';
import { api as accordion } from './games/accordion';
import { api as aceOfHearts } from './games/aceOfHearts';

export enum Games {
  Accordion = 'Accordion',
  AceOfHearts = 'AceOfHearts',
}

export interface GameAPI {
  create: (seed: string) => GameBoard;
  action: (game: GameBoard, actions: Actions) => ActionResult;
}

let gameAPI = new Map<Games, GameAPI>();
gameAPI.set(Games.Accordion, accordion);
gameAPI.set(Games.AceOfHearts, aceOfHearts);

export { gameAPI };
