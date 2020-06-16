import produce, { Draft } from 'immer';
import { Card, Face, Location } from './solitaireTypes';

export const turnCard = produce((card: Draft<Card>, face: Face) => {
  card.face = face;
});
export const moveCard = produce((card: Draft<Card>, locaiton: Location) => {
  card.location = locaiton;
});
export const moveCards = produce((cards: Draft<Card[]>, locaiton: Location) => {
  for(let c of cards){
    c.location = locaiton
  }
});

export const hashCard = (card: Card): string => {
  if (card.face === Face.Down) return 'c1B';
  return `c${card.rank}${card.suit}`;
};