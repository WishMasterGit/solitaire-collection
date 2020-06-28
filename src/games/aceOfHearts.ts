import {
  Card,
  Face,
  GameBoard,
  Location,
  LocationType,
  Suits,
  Rank,
  Deck,
  Locations,
  DeckGenerator,
  DeckGeneratorAction,
} from '../solitaireTypes';
import produce, { castDraft } from 'immer';
import _ from 'lodash';
import { turnCard, moveCard, moveCards } from '../card';
import {
  getPile,
  updatePile,
  cardToPile,
  cardsToPile,
  canGetCradFrom,
  getCardFrom,
  splitPile,
} from '../gameBoard';

export const createGame = (deck: Deck): GameBoard => {
  let game = {
    [LocationType.Stock]: [
      {
        cards: moveCards(deck.cards, {
          type: LocationType.Stock,
          index: 0,
        }),
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

export function initialDeal(game: GameBoard): GameBoard {
  let tableaus = game[LocationType.Tableau];
  tableaus = tableaus.map((tableau, i) => {
    for (let j = 1; j <= i + 1; j++) {
      if (!canGetCradFrom(game, Locations.Stock)) {
        continue;
      }
      let [card, newGame] = getCardFrom(game, Locations.Stock);
      card = turnCard(card, Face.Up);
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

export const createAndDeal = _.curry((deckGenerator: DeckGenerator, action: DeckGeneratorAction): GameBoard => {
  const game = deckGenerator.get(action.type)?.(action.value)
  return initialDeal(game as GameBoard);
})

export function dealFromStock(game: GameBoard): GameBoard {
  let tableaus = game[LocationType.Tableau];
  tableaus = tableaus.map(tableau => {
    if (game[LocationType.Stock][0].cards.length === 0) return tableau;
    let [card, newGame] = getCardFrom(game, Locations.Stock);
    card = turnCard(card, Face.Up);
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
  if (to.location === from.location) {
    return game;
  }
  let tableauTo = getPile(game, to.location);
  let lastCard = _(tableauTo.cards).last() as Card;
  if (lastCard.rank - from.rank === 1 && lastCard.suit === from.suit) {
    let split = splitPile(game, from);
    game = updatePile(game, split.rest);
    let cards = moveCards(split.sub.cards, {
      type: tableauTo.location.type,
      index: tableauTo.location.index,
    });
    tableauTo = cardsToPile(tableauTo, cards);
    game = updatePile(game, tableauTo);
  }
  return game;
}

export function moveToEmptyTableau(
  game: GameBoard,
  from: Card,
  toLocation: Location
): GameBoard {
  let tableau = getPile(game, toLocation);
  if (tableau.cards.length === 0) {
    if (from.rank === Rank.K) {
      let split = splitPile(game, from);
      game = updatePile(game, split.rest);
      let cards = moveCards(split.sub.cards, {
        type: tableau.location.type,
        index: tableau.location.index,
      });
      tableau = cardsToPile(tableau, cards);
    }
  }
  return updatePile(game, tableau);
}

export function moveToFoundation(game: GameBoard, from: Card): GameBoard {
  let foundation = getPile(game, Locations.Foundation0);
  if (foundation.cards.length === 0) {
    if (from.suit === Suits.heart && from.rank === Rank.A) {
      let split = splitPile(game, from);
      game = updatePile(game, split.rest);
      from = moveCard(from, {
        type: foundation.location.type,
        index: foundation.location.index,
      });
      foundation = cardToPile(foundation, from);
    }
  } else {
    let lastCard = _(foundation.cards).last() as Card;
    if (
      lastCard.rank - from.rank === 1 ||
      (lastCard.rank === Rank.K && from.rank === Rank.A)
    ) {
      let split = splitPile(game, from);
      game = updatePile(game, split.rest);
      from = moveCard(from, {
        type: foundation.location.type,
        index: foundation.location.index,
      });
      foundation = cardToPile(foundation, from);
    }
  }
  return updatePile(game, foundation);
}
