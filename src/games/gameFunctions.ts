import { Game, Card, LocationType} from '../solitaireTypes';
import { getPile } from '../gameBoard';
import _ from 'lodash';


export function anyMovesLeft(game: Game): [boolean, Card | undefined, Card | undefined] {

  const lastCards = game.board.tableau
    .map(t => _.last(t.cards))
    .reduce((a, c) => {
      if (c) {
        a.push(c);
      }
      return a;
    }, new Array<Card>());

  const allCards = game.board.tableau.flatMap(t => t.cards);

  for (let lastCard of lastCards) {
    const canMoveToFoundations = game.board.foundation.reduce((a, c) => {
      let pile = getPile(game,c.location)
      return a && game.rules[c.location.type](game.board, lastCard, pile)
    }, true)

    if (canMoveToFoundations) {
      return [true, undefined, lastCard]
    }
    for (let card of allCards) {
      if (game.rules[LocationType.Tableau](game.board, card, lastCard)) {
        return [true, card, lastCard];
      }
    }
  }

  return [false, undefined, undefined];
}