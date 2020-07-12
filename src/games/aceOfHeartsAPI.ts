import { execute } from '../action';
import { createGame, rules, anyMovesLeft } from './aceOfHearts';
import { GameAPI } from '../gameFactory';
import { createAndDeal } from '../deal';
import { getActionSet, getDeckGenerator, getGameState } from './commonAPIfunc';

export const api: GameAPI = {
  create: createAndDeal(getDeckGenerator(createGame)),
  action: execute(getActionSet(rules)),
  state: getGameState(anyMovesLeft),
};
