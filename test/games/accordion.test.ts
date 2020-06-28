import {
  selectCard,
  moveCardTo,
  anyMovesLeft,
} from '../../src/games/accordion';

import {api} from '../../src/games/accordionAPI';
import { GameBoard, LocationType, ActionType, GameState, DeckGenerators } from '../../src/solitaireTypes';
import { getPile } from '../../src/gameBoard';
import { newAction } from '../../src/action';

let defaultGame = (seed = "default") => api.create({type:DeckGenerators.Seed, value:seed})

describe('accordion', () => {
  test('auto deal', () => {
    let game: GameBoard = defaultGame();
    let tableau = getPile(game, { type: LocationType.Tableau, index: 0 })
    let stock = getPile(game, { type: LocationType.Stock, index: 0 })
    expect(tableau.cards.length).toEqual(52);
    expect(stock.cards.length).toEqual(0);
  });
  test('match', () => {
    let game: GameBoard = defaultGame('seed');
    let toCard = selectCard(game, 47);
    let result = moveCardTo(game, 50, 47);
    let tableau = getPile(result[1], { type: LocationType.Tableau, index: 0 })
    expect(tableau.cards.length).toEqual(51);
    expect(result[0]).toEqual(true);
    expect(tableau.cards).not.toContainEqual(toCard[1]);
    let state:GameState = api.state(result[1])
    expect(state).toEqual(GameState.InProgress);
  });
  test('any moves method works', () => {
    const game: GameBoard = defaultGame('seed');
    const [anyMoves, from, to] = anyMovesLeft(game)
    expect(anyMoves).toBeTruthy();
    expect(from).toEqual(3);
    expect(to).toEqual(0);
  });
  test('autoplay till game end', () => {
    let game: GameBoard = defaultGame('seed');
    let canMove = true
    while (canMove) {
      const [anyMoves, from, to] = anyMovesLeft(game)
      canMove = anyMoves
      game = moveCardTo(game, from, to)[1]
    }
    expect(api.state(game)).toBeTruthy()
  });
  test('actions', () => {
    let game: GameBoard = defaultGame('seed');
    let fromCard = selectCard(game, 50)[1];
    let toCard = selectCard(game, 47)[1];
    let actions = newAction([], { type: ActionType.Card, value: fromCard })
    let result = api.action(game, actions)
    expect(result.actions).toEqual(actions)
    actions = newAction(actions, { type: ActionType.Card, value: toCard })
    result = api.action(game, actions)
    let tableau = getPile(result.game, { type: LocationType.Tableau, index: 0 })
    expect(tableau.cards.length).toEqual(51);
    expect(tableau.cards).not.toContainEqual(toCard);
    expect(result.actions.length).toEqual(0)
  });
});
