import {Stock, Card, Face, Tableau} from "../solitaireTypes"
export type Accordion = {
  stock:Stock
  tableau:Tableau
}

export let stockClick = (game:Accordion)=>{
  let card:Card = game.stock.decks[0].cards.pop() as Card
  card.face = Face.Up
  game.tableau.cards.push(card)
}