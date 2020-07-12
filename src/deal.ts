import { DeckGenerator, DeckGeneratorAction, Game } from './solitaireTypes';
import { initialDeal } from './stock';
import _ from 'lodash';

export const createAndDeal = _.curry(
  (deckGenerator: DeckGenerator, action: DeckGeneratorAction): Game => {
    const game = deckGenerator.get(action.type)?.(action.value) as Game;
    return initialDeal(game, game.meta.type);
  }
);
