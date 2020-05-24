import {
  Card,
  Face,
  GameBoard,
  Location,
  LocationType,
  Pile,
  Actions,
  ActionType,
  ActionFunction,
} from '../solitaireTypes';
import { actionsTypeHash, execute } from '../action';
import { shuffleDeck, DefaultDeck } from '../deck';
import produce, { Draft, castDraft } from 'immer';
import _ from 'lodash';
import { turnCard, moveCard } from '../card';
import { getPile, updatePile, removeFromPile } from '../gameBoard';
import { GameAPI } from 'gameFactory';

export let create = (seed = 'default'): GameBoard => {
  let game = {
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
      { cards: [], location: { type: LocationType.Tableau, index: 0 } },
      { cards: [], location: { type: LocationType.Tableau, index: 1 } },
      { cards: [], location: { type: LocationType.Tableau, index: 2 } },
      { cards: [], location: { type: LocationType.Tableau, index: 3 } },
      { cards: [], location: { type: LocationType.Tableau, index: 4 } },
      { cards: [], location: { type: LocationType.Tableau, index: 5 } },
      { cards: [], location: { type: LocationType.Tableau, index: 6 } },
    ],
    [LocationType.Foundation]: [
      {
        cards: [],
        location: {
          type: LocationType.Foundation,
          index: 0,
        },
      },
    ],
    [LocationType.Waste]: [
      {
        cards: [],
        location: {
          type: LocationType.Waste,
          index: 0,
        },
      },
    ],
    [LocationType.Deck]: [],
  };
  return game;
};

let cardToPile = produce((pile: Draft<Pile>, card: Card) => {
  pile.cards.push(card);
});

function getCardFromStock(game: GameBoard): [Card, GameBoard] {
  let stock = getPile(game, LocationType.Stock, 0);
  let card = _(stock.cards).last() as Card;
  card = turnCard(card, Face.Up);
  stock = produce(stock, draft => {
    draft.cards.pop();
  });
  return [card, updatePile(game, stock)];
}

export function initialDeal(game: GameBoard): GameBoard {
  let tableaus = game[LocationType.Tableau];
  tableaus = tableaus.map((tableau, i) => {
    for (let j = 1; j <= i + 1; j++) {
      let [card, newGame] = getCardFromStock(game);
      game = newGame;
      card = moveCard(card, tableau.location);
      tableau = cardToPile(tableau, card);
    }
    return tableau;
  });

  return produce(game, draft => {
    draft[LocationType.Tableau] = castDraft(tableaus);
  });
}

export function createAndDeal(seed: string): GameBoard {
  const game = create(seed);
  return initialDeal(game);
}
export function dealFromStock(game: GameBoard): GameBoard {
  let tableaus = game[LocationType.Tableau];
  tableaus = tableaus.map(tableau => {
    if (game[LocationType.Stock][0].cards.length === 0) return tableau;
    let [card, newGame] = getCardFromStock(game);
    card = moveCard(card, tableau.location);
    game = newGame;
    return cardToPile(tableau, card);
  });
  return produce(game, draft => {
    draft[LocationType.Tableau] = castDraft(tableaus);
  });
}

export function moveCardInTableau(
  game: GameBoard,
  from: Card,
  to: Card
): GameBoard {
  let tableauTo = getPile(game, to.location.type, to.location.index);
  let lastCard = _(tableauTo.cards).last() as Card;
  if (lastCard.rank > from.rank) {
    game = removeFromPile(game, from);
    from = moveCard(from, {
      type: tableauTo.location.type,
      index: tableauTo.location.index,
    });
    tableauTo = cardToPile(tableauTo, from);
    game = updatePile(game, tableauTo);
  }
  return game;
}

export function moveToFoundation(game: GameBoard, from: Card): GameBoard {
  let foundation = getPile(game, LocationType.Foundation, 0);
  let lastCard = _(foundation.cards).last() as Card;
  if (lastCard.rank < from.rank) {
    game = removeFromPile(game, from);
    from = moveCard(from, {
      type: foundation.location.type,
      index: foundation.location.index,
    });
    foundation = cardToPile(foundation, from);
  }
  return updatePile(game, foundation);
}

let actionSet = new Map<String, ActionFunction>();

actionSet.set(actionsTypeHash([]), (game: GameBoard, actions: Actions) => {
  return { game, actions, log: [] };
});

actionSet.set(
  actionsTypeHash([ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    if ((actions[0].value as Card).location.type !== LocationType.Stock) {
      return { game, actions, log: [] };
    }
    return { game: dealFromStock(game), actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Location]),
  (game: GameBoard, actions: Actions) => {
    if ((actions[0].value as Location).type !== LocationType.Stock) {
      return { game, actions, log: [] };
    }
    return { game: dealFromStock(game), actions: [], log: [] };
  }
);

actionSet.set(
  actionsTypeHash([ActionType.Card, ActionType.Card]),
  (game: GameBoard, actions: Actions) => {
    let fromCard = actions[0].value as Card;
    let toCard = actions[1].value as Card;
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Tableau
    ) {
      game = moveCardInTableau(game, fromCard, toCard);
    }
    if (
      fromCard.location.type === LocationType.Tableau &&
      toCard.location.type === LocationType.Foundation
    ) {
      game = moveToFoundation(game, fromCard);
    }
    return { game, actions: [], log: [] };
  }
);

export const api: GameAPI = {
  create: createAndDeal,
  action: execute(actionSet),
};
