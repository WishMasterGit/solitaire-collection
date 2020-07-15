import {
  selectCard,
  moveCardTo,
  anyMovesLeft,
} from '../../src/games/accordion';

import {api} from '../../src/games/accordionAPI';
import { Game, LocationType, ActionType, GameState, DeckGenerators, Locations, Actions } from '../../src/solitaireTypes';
import { getPile } from '../../src/gameBoard';
import { newAction } from '../../src/action';
import {gameActions, customDeck} from '../gameReps/accordionFullGame'

let defaultGame = (seed = "default") => api.create({type:DeckGenerators.Seed, value:seed})

describe('accordion', () => {
  test('auto deal', () => {
    let game: Game = defaultGame();
    let tableau = getPile(game.board, Locations.Tableau0)
    let stock = getPile(game.board, Locations.Stock)
    expect(tableau.cards.length).toEqual(52);
    expect(stock.cards.length).toEqual(0);
  });
  test('match', () => {
    let game: Game = defaultGame('seed');
    let cards = getPile(game.board, Locations.Tableau0).cards
    let toCard = selectCard(game, 47);
    let result = moveCardTo(game, cards[50], cards[47]);
    let tableau = getPile(result.board, { type: LocationType.Tableau, index: 0 })
    expect(tableau.cards.length).toEqual(51);
    expect(tableau.cards).not.toContainEqual(toCard[1]);
    let state:GameState = api.state(result)
    expect(state).toEqual(GameState.InProgress);
  });
  test('any moves method works', () => {
    const game: Game = defaultGame('seed');
    const [anyMoves, from, to] = anyMovesLeft(game)
    expect(anyMoves).toBeTruthy();
    expect(from).toEqual(1);
    expect(to).toEqual(0);
  });
  test('autoplay till game end', () => {
    let game: Game = defaultGame('seed');
    let canMove = true
    while (canMove) {
      const [anyMoves, from, to] = anyMovesLeft(game)
      const cards = getPile(game.board, Locations.Tableau0).cards
      canMove = anyMoves
      if(anyMoves)
      {
        game = moveCardTo(game, cards[from], cards[to])
      }
    }
    expect(api.state(game)).toBeTruthy()
  });
  test('actions', () => {
    let game: Game = defaultGame('seed');
    let fromCard = selectCard(game, 50)[1];
    let toCard = selectCard(game, 47)[1];
    let actions = newAction([], { type: ActionType.Card, value: fromCard })
    let result = api.action(game, actions)
    expect(result.actions).toEqual(actions)
    actions = newAction(actions, { type: ActionType.Card, value: toCard })
    result = api.action(game, actions)
    let tableau = getPile(result.game.board, { type: LocationType.Tableau, index: 0 })
    expect(tableau.cards.length).toEqual(51);
    expect(tableau.cards).not.toContainEqual(toCard);
    expect(result.actions.length).toEqual(0)
  });
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
