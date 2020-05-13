import { Stock, Card, Tableau, Waste, Foundation, Face } from '../solitaireTypes';
import { shuffleDeck, DefaultDeck } from '../deck';
import produce, { Draft, castDraft } from 'immer'
import _ from 'lodash';
import { turnCard } from '../card';

export type AceOfHearts = Readonly<{
  stock: Stock;
  tableau: readonly Tableau[];
  foundation: Foundation;
  waste: Waste;
  fromCardIndex: number;
  toCardIndex: number;
}>;

export let create = (seed = 'default'): AceOfHearts => {
  let game: AceOfHearts = {
    stock: {
      decks: [shuffleDeck(DefaultDeck, seed)],
    },
    tableau: [
      { cards: [], index: 0 },
      { cards: [], index: 1 },
      { cards: [], index: 2 },
      { cards: [], index: 3 },
      { cards: [], index: 4 },
      { cards: [], index: 5 },
      { cards: [], index: 6 },
    ],
    foundation: {
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

let removeLastCardFromStock = produce((game: Draft<AceOfHearts>) => {
  game.stock.decks[0].cards.pop()
})

let cardToTableau = produce((tableau: Draft<Tableau>, card: Card) => {
  tableau.cards.push(card);
})
let updateTableaus = produce((game: Draft<AceOfHearts>, tableau: Tableau[]) => {
  game.tableau = castDraft(tableau)
})


let updateTableau = produce((game: Draft<AceOfHearts>, tableau: Tableau) => {
  game.tableau[tableau.index] = castDraft(tableau)
})

let cardToFoundation = produce((foundation: Draft<Foundation>, card: Card) => {
  foundation.cards.push(card);
})

let updateFoundation = produce((game: Draft<AceOfHearts>, foundation: Foundation) => {
  game.foundation = castDraft(foundation)
})

function getCardFromStock(game: AceOfHearts): [Card, AceOfHearts] {
  let card = _(game.stock.decks[0].cards).last() as Card
  card = turnCard(card, Face.Up)
  return [card, removeLastCardFromStock(game)]
}

export function initialDeal(game: AceOfHearts): AceOfHearts {
  let tableaus = game.tableau.map((tableau, i) => {
    for (let j = 1; j <= i + 1; j++) {
      const [card] = getCardFromStock(game);
      tableau = cardToTableau(tableau, card);
    }
    return tableau
  })
  return updateTableaus(game, tableaus);
}

export function dealFromStock(game: AceOfHearts): AceOfHearts {
  let tableaus = game.tableau.map((tableau) => {
    const [card] = getCardFromStock(game);
    return cardToTableau(tableau, card);
  })
  return updateTableaus(game, tableaus)
}

export function putCardToTableau(game: AceOfHearts, tableau: Tableau, card: Card): AceOfHearts {
  let lastCard = _(tableau.cards).last() as Card
  if (lastCard.rank > card.rank) {
    tableau = cardToTableau(tableau, card)
  }
  return updateTableau(game, tableau)
}

export function putCardToFoundation(game: AceOfHearts, foundation: Foundation, card: Card): AceOfHearts {
  let lastCard = _(foundation.cards).last() as Card
  if (lastCard.rank < card.rank) {
    foundation = cardToFoundation(foundation, card)
  }
  return updateFoundation(game, foundation)
}

// export function fromStockToTableau(){}

// export function fromTableauToFoundation(){}

// export function action(from,to){}