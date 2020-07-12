import {
  Game,
  Actions,
  ActionResult,
  DeckGeneratorAction,
  GameState,
  Games,
} from './solitaireTypes';
import { api as accordion } from './games/accordionAPI';
import { api as aceOfHearts } from './games/aceOfHeartsAPI';
import { api as queenie} from './games/queenieAPI';
import { api as yukon} from './games/yukonAPI';
import { api as buildDeck } from './games/buildDeckAPI';

export interface GameAPI {
  create: (generator: DeckGeneratorAction) => Game;
  action: (game: Game, actions: Actions) => ActionResult;

  state: (game: Game) => GameState;
}

let gameAPI = new Map<Games, GameAPI>();
gameAPI.set(Games.Accordion, accordion);
gameAPI.set(Games.AceOfHearts, aceOfHearts);
gameAPI.set(Games.Queenie, queenie);
gameAPI.set(Games.Yukon, yukon);
gameAPI.set(Games.BuildDeck, buildDeck);

export { gameAPI };
