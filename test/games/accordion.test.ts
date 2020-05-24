import {
  stockClick,
  create,
  autoDeal,
  selectCard,
  moveCardTo,
  gameEnded,
  anyMovesLeft,
  api
} from '../../src/games/accordion';
import {GameBoard, LocationType, ActionType } from '../../src/solitaireTypes';
import { getPile } from '../../src/gameBoard';
import { newAction } from '../../src/action';

describe('accordion', () => {
  test('stock click', () => {
    let game: GameBoard = create();

    let tableau = getPile(game,LocationType.Tableau,0)
    expect(tableau.cards.length).toEqual(0);
    let result = stockClick(game);
    tableau = getPile(result[1],LocationType.Tableau,0)
    expect(tableau.cards.length).toBeGreaterThan(0);
    expect(tableau.cards[0].location).toEqual({
      index:0,
      type:LocationType.Tableau
    });
  });
  test('auto deal', () => {
    let game: GameBoard = create();
    let tableau = getPile(game,LocationType.Tableau,0)
    expect(tableau.cards.length).toEqual(0);
    let result = autoDeal(game);
    tableau = getPile(result,LocationType.Tableau,0)
    let stock = getPile(result,LocationType.Stock,0)
    expect(tableau.cards.length).toEqual(52);
    expect(stock.cards.length).toEqual(0);
  });
  test('match', () => {
    let game: GameBoard = create('seed');
    let dealt = autoDeal(game);
    let toCard = selectCard(dealt, 47);
    let result = moveCardTo(dealt, 50, 47);
    let tableau = getPile(result[1],LocationType.Tableau,0)
    expect(tableau.cards.length).toEqual(51);
    expect(result[0]).toEqual(true);
    expect(tableau.cards).not.toContainEqual(toCard[1]);
    expect(gameEnded(result[1])).toEqual(false);
  });
  test('any moves method works', () => {
    const game: GameBoard = create('seed');
    const dealt = autoDeal(game);
    const [anyMoves,from,to] = anyMovesLeft(dealt)
    expect(anyMoves).toBeTruthy();
    expect(from).toEqual(3);
    expect(to).toEqual(0);
  });
  test('autoplay till game end', () => {
    const game: GameBoard = create('seed');
    let dealt = autoDeal(game);
    let canMove = true
    while(canMove){
      const [anyMoves,from,to] = anyMovesLeft(dealt)
      canMove = anyMoves
      dealt = moveCardTo(dealt,from,to)[1]
    }
    expect(gameEnded(dealt)).toBeTruthy()
  });
  test('actions', () => {
    const game: GameBoard = create('seed');
    let dealt = autoDeal(game);
    let fromCard = selectCard(dealt, 50)[1];
    let toCard = selectCard(dealt, 47)[1];
    let actions = newAction([],{type:ActionType.Card, value:fromCard})
    let result = api.action(dealt,actions)
    expect(result.actions).toEqual(actions)
    actions = newAction(actions,{type:ActionType.Card, value:toCard})
    result = api.action(dealt,actions)
    let tableau = getPile(result.game,LocationType.Tableau,0)
    expect(tableau.cards.length).toEqual(51);
    expect(tableau.cards).not.toContainEqual(toCard);
    expect(result.actions.length).toEqual(0)
  });
});
