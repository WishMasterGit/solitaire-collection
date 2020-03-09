import { Stock, Deck, Suits } from './solitaireTypes';

export let addDeck = (stock: Stock): Stock => {
  let deck: Deck = {
    cards: [{ rank: 1, suit: Suits.clubs }],
  };
  return stock;
};
