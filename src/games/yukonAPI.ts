import { execute } from '../action';
import { createGame, anyMovesLeft, rules } from './yukon';
import { GameAPI } from '../gameFactory';
import { createAndDeal } from '../deal';
import { getDeckGenerator, getActionSet, getGameState } from './commonAPIfunc';

export const api: GameAPI = {
  create: createAndDeal(getDeckGenerator(createGame)),
  action: execute(getActionSet(rules)),
  state: getGameState(anyMovesLeft),
};
