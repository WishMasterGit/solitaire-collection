import { Stock, Card, Face, Tableau, Waste } from '../solitaireTypes';
import { shuffleDeck, DefaultDeck } from '../deck';
export type Accordion = {
  stock: Stock;
  tableau: Tableau;
  waste: Waste;
  fromCardIndex: number;
  toCardIndex: number;
};


export let create = (seed = 'default'): Accordion => {
  let game = {
    stock: {
      decks: [shuffleDeck(DefaultDeck, seed)],
    },
    tableau: {
      cards: [],
    },
    waste: {
      cards: [],
    },
    fromCardIndex: -1,
    toCardIndex: -1,
  };
  return game;
};

export function stockClick(game: Accordion): [Card, Accordion] {
  let card: Card = game.stock.decks[0].cards.last()
  const newDeck = game.stock.decks[0].cards.pop()
  game.stock.decks[0] = game.stock.decks[0].set('cards',newDeck);
  card = card.set('face',Face.Up);
  game.tableau.cards.push(card);
  return [card, game];
}

export function cardClick(game: Accordion, index: number): Accordion {
  const from = game.fromCardIndex === -1 ? index : game.fromCardIndex;
  const to = game.fromCardIndex !== -1 ? index : game.toCardIndex;
  game.fromCardIndex = from;
  game.toCardIndex = to;
  return game;
}

export function cardClickAndMove(game:Accordion, index:number):[boolean,Accordion]{
  let result = cardClick(game,index)
  if(result.fromCardIndex !== -1 && result.toCardIndex !== -1){
      let [moveResult,game] =  moveCard(result,result.fromCardIndex, result.toCardIndex)
      game.fromCardIndex = -1 
      game.toCardIndex = -1
      return [moveResult,game] 
  }
  return [false,result]
}
export function autoDeal(game: Accordion): Accordion {
  while (game.stock.decks[0].cards.size> 0) {
    stockClick(game);
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
  if (!canMove) return [true,game];
  game.tableau.cards.splice(to, 1, fromCard);
  game.tableau.cards.splice(from, 1);
  game.waste.cards.push(toCard);
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
