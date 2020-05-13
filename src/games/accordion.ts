import { Stock, Card, Face, Tableau, Waste } from '../solitaireTypes';
import { shuffleDeck, DefaultDeck } from '../deck';
import produce, { Draft } from 'immer'
import _ from 'lodash';
import { turnCard } from '../card';
export type Accordion = Readonly<{
  stock: Stock;
  tableau: Tableau;
  waste: Waste;
  fromCardIndex: number;
  toCardIndex: number;
}>;

export let create = (seed = 'default'): Accordion => {
  let game = {
    stock: {
      decks: [shuffleDeck(DefaultDeck, seed)],
    },
    tableau: {
      cards: [],
      index:0
    },
    waste: {
      cards: [],
    },
    fromCardIndex: -1,
    toCardIndex: -1,
  };
  return game;
};

let moveCardFromStockToTableau = produce((game: Draft<Accordion>, card: Card) => {
  game.stock.decks[0].cards.pop();
  game.tableau.cards.push(card);
})

let updateIndex = produce((game: Draft<Accordion>, from: number, to: number) => {
  game.fromCardIndex = from;
  game.toCardIndex = to;
})
export function stockClick(game: Accordion): [Card, Accordion] {
  return _(game.stock.decks[0].cards)
    .chain()
    .last()
    .thru((c) => turnCard(c, Face.Up))
    .thru((c) => [c, moveCardFromStockToTableau(game, c)])
    .value() as [Card, Accordion]
}

export function cardClick(game: Accordion, index: number): Accordion {
  const from = game.fromCardIndex === -1 ? index : game.fromCardIndex;
  const to = game.fromCardIndex !== -1 ? index : game.toCardIndex;
  return updateIndex(game, from, to)
}

export function cardClickAndMove(
  game: Accordion,
  index: number
): [boolean, Accordion] {
  let result = cardClick(game, index);
  if (result.fromCardIndex !== -1 && result.toCardIndex !== -1) {
    let [moveResult, game] = moveCard(result, result.fromCardIndex, result.toCardIndex);
    return [moveResult, updateIndex(game, -1, -1)];
  }
  return [false, result];
}
export function autoDeal(game: Accordion): Accordion {
  while (game.stock.decks[0].cards.length > 0) {
    game = stockClick(game)[1];
  }
  return game;
}

export function selectCard(game: Accordion, index: number): [number, Card] {
  return [index, game.tableau.cards[index]];
}

export function canMoveCard(
  game: Accordion,
  from: number,
  to: number
): [boolean, Card, Card] {
  let indexDiff = from - to;
  let fromCard = game.tableau.cards[from];
  let toCard = game.tableau.cards[to];
  if (indexDiff === 3 || indexDiff === 1) {
    if (fromCard.suit === toCard.suit || fromCard.rank === toCard.rank) {
      return [true, fromCard, toCard];
    }
  }
  return [false, fromCard, toCard];
}
export function moveCard(
  game: Accordion,
  from: number,
  to: number
): [boolean, Accordion] {
  const [canMove, fromCard, toCard] = canMoveCard(game, from, to);
  if (!canMove) return [true, game];
  game = produce(game, draft => {
    draft.tableau.cards.splice(to, 1, fromCard);
    draft.tableau.cards.splice(from, 1);
    draft.waste.cards.push(toCard);
  })
  return [true, game];
}

export function anyMovesLeft(game: Accordion): [boolean, number, number] {
  let cards = game.tableau.cards;
  for (let i = 3; i < cards.length; i++) {
    const [canMove] = canMoveCard(game, i, i - 3);
    if (canMove) {
      return [true, i, i - 3];
    }
  }
  return [false, -1, -1];
}

export function gameEnded(game: Accordion): boolean {
  const [anyMoves] = anyMovesLeft(game);
  return game.waste.cards.length === 52 || !anyMoves;
}
