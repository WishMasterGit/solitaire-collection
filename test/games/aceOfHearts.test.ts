import {
  create,
  initialDeal,
  dealFromStock,
  api, 
  createGame
} from '../../src/games/aceOfHearts';
import { GameBoard, LocationType, ActionType, Suits} from '../../src/solitaireTypes';
import { newAction} from '../../src/action';
import { deckFromString } from '../../src/deck';
import { cardFromString } from '../../src/card';
describe('aceOfHeartsTest', () => {
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
  test('undo', () => {
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
  test('initial deal', () => {
    let game: GameBoard= create();
    game = initialDeal(game)
    let cardTo = {
      rank: 9,
      suit: Suits.spade,
      face: 1,
      location: {
        type: LocationType.Tableau,
        index: 3
      }
    }
    let cardFrom = {
      rank: 8,
      suit: Suits.spade,
      face: 1,
      location: {
        type: LocationType.Tableau,
        index: 5
      }
    }
    let actions = newAction([],{type:ActionType.Card, value:cardFrom})
    actions = newAction(actions,{type:ActionType.Card, value:cardTo})
    let result = api.action(game,actions)
    expect(result.game[LocationType.Tableau][3].cards.length).toEqual(6)
    expect(result.game[LocationType.Tableau][5].cards.length).toEqual(4)
  });
  test('moveToFoundation',()=>{
    const deck = deckFromString('1H0deck0')
    let game = createGame(deck)
    game = initialDeal(game)
    const fromCard = game.tableau[0].cards[0] 
    let actions = newAction([],{type:ActionType.Card, value:fromCard})
    actions = newAction(actions,{type:ActionType.Location, value:game.foundation[0].location})
    let result = api.action(game,actions)
    let expectedCard = cardFromString('1H1foundation0') 
    expect(result.game.foundation[0].cards[0]).toEqual(expectedCard)
  })
  test('cantMoveToFoundation',()=>{
    const deck = deckFromString('1C0deck0')
    let game = createGame(deck)
    game = initialDeal(game)
    const fromCard = game.tableau[0].cards[0] 
    let actions = newAction([],{type:ActionType.Card, value:fromCard})
    actions = newAction(actions,{type:ActionType.Location, value:game.foundation[0].location})
    let result = api.action(game,actions)
    expect(result.game.foundation[0].cards.length).toEqual(0)
  })
});