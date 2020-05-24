import {
  create,
  initialDeal,
  dealFromStock,
  api 
} from '../../src/games/aceOfHearts';
import { GameBoard, LocationType, ActionType} from '../../src/solitaireTypes';
import { newAction } from '../../src/action';
describe('accordion', () => {
  test('initial deal', () => {
    let game: GameBoard= create();
    game = initialDeal(game)
    let tableau = game[LocationType.Tableau]
    expect(tableau[0].cards.length).toEqual(1)
    expect(tableau[1].cards.length).toEqual(2)
    expect(tableau[2].cards.length).toEqual(3)
    expect(tableau[3].cards.length).toEqual(4)
    expect(tableau[4].cards.length).toEqual(5)
    expect(tableau[5].cards.length).toEqual(6)
    expect(tableau[6].cards.length).toEqual(7)
  });
  test('stock click', () => {
    let game: GameBoard = create();
    game = initialDeal(game)
    game = dealFromStock(game)
    let tableau = game[LocationType.Tableau]
    expect(tableau[0].cards.length).toEqual(2)
    expect(tableau[1].cards.length).toEqual(3)
    expect(tableau[2].cards.length).toEqual(4)
    expect(tableau[3].cards.length).toEqual(5)
    expect(tableau[4].cards.length).toEqual(6)
    expect(tableau[5].cards.length).toEqual(7)
    expect(tableau[6].cards.length).toEqual(8)
  });
  test('stock click action', () => {
    let game: GameBoard = create();
    game = initialDeal(game)
    let actions = newAction([],{type:ActionType.Location, value:{type:LocationType.Stock,index:0}})
    game = api.action(game,actions).game
    let tableau = game[LocationType.Tableau]
    expect(tableau[0].cards.length).toEqual(2)
    expect(tableau[1].cards.length).toEqual(3)
    expect(tableau[2].cards.length).toEqual(4)
    expect(tableau[3].cards.length).toEqual(5)
    expect(tableau[4].cards.length).toEqual(6)
    expect(tableau[5].cards.length).toEqual(7)
    expect(tableau[6].cards.length).toEqual(8)
  });
  test('stock is empty', () => {
    let game: GameBoard = create();
    game = initialDeal(game)
    let actions = newAction([],{type:ActionType.Location, value:{type:LocationType.Stock,index:0}})
    for(let i =0; i <= 10; i++)
    {
      game = api.action(game,actions).game
    }
    expect(game.stock[0].cards.length).toEqual(0)

  });
});