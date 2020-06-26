import {
  Card,
  Face,
  LocationType,
  GameBoard,
  Actions,
  ActionFunction,
  ActionType,
  Locations,
  GameState,
} from '../solitaireTypes';
import { shuffleDeck, DefaultDeck } from '../deck';
import produce from 'immer';
import _ from 'lodash';
import { turnCard, moveCard } from '../card';
import { getPile, updatePile, findInPile } from '../gameBoard';
import { GameAPI } from 'gameFactory';
import { actionsTypeHash, setDefault, execute } from '../action';

export let create = (seed = 'default'): GameBoard => {
  let game: GameBoard = {
    [LocationType.Stock]: [
      {
        cards: shuffleDeck(DefaultDeck, seed).cards,
        location: {
          type: LocationType.Stock,
          index: 0,
        },
      },
    ],
    [LocationType.Tableau]: [
      {
        cards: [],
        location: {
          type: LocationType.Tableau,
          index: 0,
        },
      },
    ],
    [LocationType.Waste]: [
      {
        cards: shuffleDeck(DefaultDeck, seed).cards,
        location: {
          type: LocationType.Waste,
          index: 0,
        },
      },
    ],
    [LocationType.Foundation]: [],
    [LocationType.Deck]: [],
  };

  return game;
};

export function stockClick(game: GameBoard): [Card, GameBoard] {
  let stock = getPile(game, Locations.Stock);
  let tableau = getPile(game, Locations.Tableau0);
  let card = _(stock.cards).last() as Card;
  card = turnCard(card, Face.Up);
  card = moveCard(card, Locations.Tableau0);
  stock = produce(stock, draft => {
    draft.cards.pop();
  });
  tableau = produce(tableau, draft => {
    draft.cards.push(card);
  });
  game = updatePile(game, stock);
  game = updatePile(game, tableau);
  return [card, game];
}

export function autoDeal(game: GameBoard): GameBoard {
  let stock = getPile(game, Locations.Stock);
  while (stock.cards.length > 0) {
    game = stockClick(game)[1];
    stock = getPile(game, Locations.Stock);
  }
  return game;
}

export function createAndDeal(seed: string): GameBoard {
  const game = create(seed);
  return autoDeal(game);
}

export function selectCard(game: GameBoard, index: number): [number, Card] {
  const tableau = getPile(game, Locations.Tableau0);
  return [index, tableau.cards[index]];
}

export function canMoveCard(
  game: GameBoard,
  from: number,
  to: number
): [boolean, Card, Card] {
  let indexDiff = from - to;
  let tableau = getPile(game, Locations.Tableau0);
  let fromCard = tableau.cards[from];
  let toCard = tableau.cards[to];
  if (indexDiff === 3 || indexDiff === 1) {
    if (fromCard.suit === toCard.suit || fromCard.rank === toCard.rank) {
      return [true, fromCard, toCard];
    }
  }
  return [false, fromCard, toCard];
}
export function moveCardTo(
  game: GameBoard,
  from: number,
  to: number
): [boolean, GameBoard] {
  let [canMove, fromCard, toCard] = canMoveCard(game, from, to);
  if (!canMove) return [true, game];
  fromCard = moveCard(fromCard, {
    index: 0,
    type: LocationType.Tableau,
  });
  toCard = moveCard(fromCard, {
    index: 0,
    type: LocationType.Tableau,
  });
  let tableau = getPile(game, Locations.Tableau0);
  tableau = produce(tableau, draft => {
    draft.cards.splice(to, 1, fromCard);
  });
  tableau = produce(tableau, draft => {
    draft.cards.splice(from, 1);
  });
  let waste = getPile(game, Locations.Waste0);
  waste = produce(waste, draft => {
    draft.cards.push(toCard);
  });
  game = updatePile(game, tableau);
  game = updatePile(game, waste);
  return [true, game];
}

export function anyMovesLeft(game: GameBoard): [boolean, number, number] {
  let tableau = getPile(game, Locations.Tableau0).cards;
  for (let i = 3; i < tableau.length; i++) {
    const [canMove] = canMoveCard(game, i, i - 3);
    if (canMove) {
      return [true, i, i - 3];
    }
  }
  return [false, -1, -1];
}

export function getGameState(game: GameBoard): GameState {
  const [anyMoves] = anyMovesLeft(game);
  const waste = getPile(game, { type: LocationType.Waste, index: 0 });
  if(!anyMoves){
    return GameState.NoMoreMoves
  }
  if(
    waste.cards.length === 52 
  )
  {
    return GameState.GameOver
  }
  return GameState.InProgress 
}

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
  create: createAndDeal,
  action: execute(actionSet),
};
