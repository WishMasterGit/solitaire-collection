import { Stock, Card,  Tableau, Waste, Foundation } from '../solitaireTypes';
import { shuffleDeck, DefaultDeck } from '../deck';

export type AceOfHearts = {
  stock: Stock;
  tableau: Tableau[];
  foundation: Foundation
  waste: Waste;
  fromCardIndex: number;
  toCardIndex: number;
};


export let create = (seed = 'default'): AceOfHearts => {
  let game: AceOfHearts = {
    stock: {
      decks: [shuffleDeck(DefaultDeck, seed)],
    },
    tableau: [
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] },
      { cards: [] }
    ],
    foundation:{
      cards: []
    },
    waste: {
      cards: [],
    },
    fromCardIndex: -1,
    toCardIndex: -1,
  };
  return game;
};

function getCardFromStock(game:AceOfHearts):[Card,AceOfHearts]{
  const card = game.stock.decks[0].cards.pop() as Card
  return [card,game]
}

export function initialDeal(game:AceOfHearts):AceOfHearts{
  for(let i = 0; i <= game.tableau.length-1; i++){
    for(let j = 1; j <= i+1; j++){
      const [card] = getCardFromStock(game)
      game.tableau[i].cards.push(card)
    }
  }
  return game
}
