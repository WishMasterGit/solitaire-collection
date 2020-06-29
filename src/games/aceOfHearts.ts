import { Card, GameBoard, Location, LocationType, Suits, Rank, Deck, Locations, DeckGenerator, DeckGeneratorAction } from '../solitaireTypes';
import produce from 'immer';
import _ from 'lodash';
import { moveCards } from '../card';
import { getPile, updatePile, moveLastCard, canGetCradFrom, moveSubPile } from '../gameBoard';

export const createGame = (deck: Deck): GameBoard => {
  let game = {
    [LocationType.Stock]: [
      {
        cards: moveCards(deck.cards, Locations.Stock),
        location: Locations.Stock,
      },
    ],
    [LocationType.Tableau]: [
      { cards: [], location: Locations.Tableau0 },
      { cards: [], location: Locations.Tableau1 },
      { cards: [], location: Locations.Tableau2 },
      { cards: [], location: Locations.Tableau3 },
      { cards: [], location: Locations.Tableau4 },
      { cards: [], location: Locations.Tableau5 },
      { cards: [], location: Locations.Tableau6 },
    ],
    [LocationType.Foundation]: [
      {
        cards: [],
        location: Locations.Foundation0,
      },
    ],
    [LocationType.Waste]: [
      {
        cards: [],
        location: Locations.Waste0,
      },
    ],
    [LocationType.Deck]: [],
  };
  return game;
};

export function initialDeal(game: GameBoard): GameBoard {
  let tableaus = game[LocationType.Tableau];
  let newGame = game;
  for (let tableau of tableaus) {
    for (let j = 1; j <= tableau.location.index + 1; j++) {
      if (canGetCradFrom(newGame, Locations.Stock)) {
        newGame = produce(newGame, _draft => moveLastCard(newGame, Locations.Stock, tableau.location));
      }
    }
  }
  return newGame;
}

export const createAndDeal = _.curry(
  (deckGenerator: DeckGenerator, action: DeckGeneratorAction): GameBoard => {
    const game = deckGenerator.get(action.type)?.(action.value);
    return initialDeal(game as GameBoard);
  }
);

export function dealFromStock(game: GameBoard): GameBoard {
  let tableaus = game[LocationType.Tableau];
  let newGame = game;
  for (let tableau of tableaus) {
    if (canGetCradFrom(newGame, Locations.Stock)) {
      newGame = produce(newGame, _draft => moveLastCard(newGame, Locations.Stock, tableau.location));
    }
  }
  return newGame;
}

function canMoveInTableau(from: Card, lastInPile: Card) {
  return lastInPile.rank - from.rank === 1 && lastInPile.suit === from.suit;
}
export function moveCardInTableau(game: GameBoard, from: Card, to: Card): GameBoard {
  if (to.location === from.location) {
    return game;
  }
  let tableauTo = getPile(game, to.location);
  let lastCard = _(tableauTo.cards).last() as Card;
  if (canMoveInTableau(from, lastCard)) {
    return moveSubPile(game, from, tableauTo);
  }
  return game;
}

export function moveToEmptyTableau(game: GameBoard, from: Card, toLocation: Location): GameBoard {
  let tableau = getPile(game, toLocation);
  if (tableau.cards.length === 0) {
    if (from.rank === Rank.K) {
      return moveSubPile(game, from, tableau);
    }
  }
  return game;
}

export function moveToFoundation(game: GameBoard, from: Card): GameBoard {
  let foundation = getPile(game, Locations.Foundation0);
  if (foundation.cards.length === 0) {
    if (from.suit === Suits.heart && from.rank === Rank.A) {
      return moveSubPile(game, from, foundation);
    }
  } else {
    let lastCard = _(foundation.cards).last() as Card;
    if (lastCard.rank - from.rank === 1 || (lastCard.rank === Rank.K && from.rank === Rank.A)) {
      return moveSubPile(game, from, foundation);
    }
  }
  return updatePile(game, foundation);
}

export function anyMovesLeft(game: GameBoard): [boolean, Card | undefined, Card | undefined] {
  const lastCards = game.tableau
    .map(t => _.last(t.cards))
    .reduce((a, c) => { if (c) { a.push(c); } return a; }, new Array<Card>());

  const allCards = game.tableau.flatMap(t => t.cards);

  for (let lastCard of lastCards) {
    for (let card of allCards) {
      if (card.location !== lastCard.location && canMoveInTableau(card, lastCard)) {
        return [true, card, lastCard];
      }
    }
  }

  return [false, undefined, undefined];
}
