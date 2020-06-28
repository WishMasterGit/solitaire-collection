import { DeckGenerator, GameBoard, DeckGenerators, ActionFunction, Actions, ActionType, Card } from '../solitaireTypes';
import { create, moveCardTo, createAndDeal } from './accordion';
import { shuffleDeck, DefaultDeck, deckFromString } from '../deck';
import { setDefault, actionsTypeHash, execute } from '../action';
import { findInPile } from '../gameBoard';
import { GameAPI } from '../gameFactory';

const deckGenerator:DeckGenerator = new Map<String, (value:string)=>GameBoard>();
deckGenerator.set(DeckGenerators.Seed,(value)=>{
    return create(shuffleDeck(DefaultDeck,value))
})
deckGenerator.set(DeckGenerators.PreBuilt,(value)=>{
    return create(deckFromString(value))
})

let actionSet = new Map<String, ActionFunction>();
setDefault(actionSet, (game: GameBoard, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    const fromCard = actions[0].value as Card;
    const toCard = actions[1].value as Card;
    const from = findInPile(game, fromCard);
    const to = findInPile(game, toCard);
    let result = moveCardTo(game, from, to);
    return { game: result[1], actions: [], log: [] };
  }
);

export const api: GameAPI = {
  create: createAndDeal(deckGenerator),
  action: execute(actionSet)
};