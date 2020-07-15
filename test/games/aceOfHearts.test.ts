import {api} from '../../src/games/aceOfHeartsAPI'
import { Game, LocationType, ActionType, Suits, DeckGenerators, GameState, Actions} from '../../src/solitaireTypes';
import { newAction} from '../../src/action';
import { cardFromString } from '../../src/card';
import {gameActions, customDeck} from '../gameReps/aceOfHeartsFullGame'

let defaultGame = (seed = "default") => api.create({type:DeckGenerators.Seed, value:seed})

describe('aceOfHeartsTest', () => {
  test('initial deal', () => {
    let game: Game= defaultGame();
    let tableau = game.board[LocationType.Tableau]
    expect(tableau[0].cards.length).toEqual(1)
    expect(tableau[1].cards.length).toEqual(2)
    expect(tableau[2].cards.length).toEqual(3)
    expect(tableau[3].cards.length).toEqual(4)
    expect(tableau[4].cards.length).toEqual(5)
    expect(tableau[5].cards.length).toEqual(6)
    expect(tableau[6].cards.length).toEqual(7)
  });
  test('stock click action', () => {
    let game: Game = defaultGame();
    let actions = newAction([],{type:ActionType.Location, value:{type:LocationType.Stock,index:0}})
    game = api.action(game,actions).game
    let tableau = game.board[LocationType.Tableau]
    expect(tableau[0].cards.length).toEqual(2)
    expect(tableau[1].cards.length).toEqual(3)
    expect(tableau[2].cards.length).toEqual(4)
    expect(tableau[3].cards.length).toEqual(5)
    expect(tableau[4].cards.length).toEqual(6)
    expect(tableau[5].cards.length).toEqual(7)
    expect(tableau[6].cards.length).toEqual(8)
  });
  test('undo', () => {
    let game: Game = defaultGame();
    let actions = newAction([],{type:ActionType.Location, value:{type:LocationType.Stock,index:0}})
    game = api.action(game,actions).game
    let tableau = game.board[LocationType.Tableau]
    expect(tableau[0].cards.length).toEqual(2)
    expect(tableau[1].cards.length).toEqual(3)
    expect(tableau[2].cards.length).toEqual(4)
    expect(tableau[3].cards.length).toEqual(5)
    expect(tableau[4].cards.length).toEqual(6)
    expect(tableau[5].cards.length).toEqual(7)
    expect(tableau[6].cards.length).toEqual(8)
  });
  test('stock is empty', () => {
    let game: Game = defaultGame();
    let actions = newAction([],{type:ActionType.Location, value:{type:LocationType.Stock,index:0}})
    for(let i =0; i <= 10; i++)
    {
      game = api.action(game,actions).game
    }
    expect(game.board.stock[0].cards.length).toEqual(0)

  });
  test('initial deal', () => {
    let game: Game= defaultGame();
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
    expect(result.game.board[LocationType.Tableau][3].cards.length).toEqual(6)
    expect(result.game.board[LocationType.Tableau][5].cards.length).toEqual(4)
  });
  test('moveToFoundation',()=>{
    let game = api.create({type:DeckGenerators.PreBuilt, value:'1H0deck0'})
    const fromCard = game.board.tableau[0].cards[0] 
    let actions = newAction([],{type:ActionType.Card, value:fromCard})
    actions = newAction(actions,{type:ActionType.Location, value:game.board.foundation[0].location})
    let result = api.action(game,actions)
    let expectedCard = cardFromString('1H1foundation0') 
    expect(result.game.board.foundation[0].cards[0]).toEqual(expectedCard)
  })
  test('cantMoveToFoundation',()=>{
    let game = api.create({type:DeckGenerators.PreBuilt, value:'1C0deck0'})
    const fromCard = game.board.tableau[0].cards[0] 
    let actions = newAction([],{type:ActionType.Card, value:fromCard})
    actions = newAction(actions,{type:ActionType.Location, value:game.board.foundation[0].location})
    let result = api.action(game,actions)
    expect(result.game.board.foundation[0].cards.length).toEqual(0)
  })
  test('game in progress',()=>{
    let game = defaultGame() 
    let state = api.state(game)
    expect(state).toEqual(GameState.InProgress)
  })
  test('no more moves left',()=>{
    let game = api.create({type:DeckGenerators.PreBuilt, value:'1C0deck0'})
    let state = api.state(game)
    expect(state).toEqual(GameState.NoMoreMoves)
  })
  test('full game', ()=>{
    let game = api.create(customDeck);
    let actions = gameActions as Actions[];
    while(actions.length > 0){
      expect(api.state(game)).toEqual(GameState.InProgress)
      let nextAction = actions.shift() as Actions
      let result = api.action(game,nextAction)
      game = result.game
    } 
    expect(api.state(game)).toEqual(GameState.GameOver)
  })
});