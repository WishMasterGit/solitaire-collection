import { Stock, Card, Face, Tableau } from '../solitaireTypes';
import { shuffleDeck, DefaultDeck } from '../deck';
export type Accordion = {
  stock: Stock;
  tableau: Tableau;
};

export let create = (seed = 'default'): Accordion => {
  let game: Accordion = {
    stock: {
      decks: [shuffleDeck(DefaultDeck, seed)],
    },
    tableau: {
      cards: [],
    },
  };
  return game;
};

export let stockClick = (game: Accordion): [Card, Accordion] => {
  let card: Card = game.stock.decks[0].cards.pop() as Card;
  card.face = Face.Up;
  game.tableau.cards.push(card);
  return [card, game];
};

export let autoDeal = (game: Accordion): Accordion => {
  while (game.stock.decks[0].cards.length > 0) {
    stockClick(game);
  }
  return game;
};

export let selectCard = (game: Accordion, index: number): [number, Card] => {
  return [index, game.tableau.cards[index]];
};

export let moveCard = (
  game: Accordion,
  card: [number, Card],
  toIndex: number
): [Accordion, boolean] => {
  let indexDiff = card[0] - toIndex;
  if (indexDiff < 0 || indexDiff > 3 || indexDiff === 2) return [game, false];
  let fromCard = card[1];
  let toCard = game.tableau.cards[toIndex];
  if (fromCard.suit === toCard.suit || fromCard.rank === toCard.rank) {
    game.tableau.cards.splice(toIndex, 1,fromCard);
    game.tableau.cards.splice(card[0],1)
    return [game, true];
  }
  return [game, false];
};
