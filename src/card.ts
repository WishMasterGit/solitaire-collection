import produce, { Draft } from 'immer';
import { Card, Face, Location, Suits, LocationType } from './solitaireTypes';

export const turnCard = produce((card: Draft<Card>, face: Face) => {
  card.face = face;
});
export const moveCard = produce((card: Draft<Card>, locaiton: Location) => {
  card.location = locaiton;
});
export const moveCards = produce((cards: Draft<Card[]>, locaiton: Location) => {
  for (let c of cards) {
    c.location = locaiton;
  }
});

export const hashCard = (card: Card): string => {
  if (card.face === Face.Down) return 'c1B';
  return `c${card.rank}${card.suit}`;
};
export const cardToString = (card: Card): string => {
  return `${card.rank}${card.suit}${card.face}${card.location.type}${card.location.index}`;
};

export const cardFromString = (card: string): Card => {
  const numRe = /\d{1,2}/g
  const stringsRe = /\D+/g
  const [rank, face, index] = Array.from(card.matchAll(numRe)).flat()
  const [suit, type] = Array.from(card.matchAll(stringsRe)).flat()
  return {
    rank: Number.parseInt(rank),
    suit: suit as Suits,
    face: Number.parseInt(face),
    location: {
      index: Number.parseInt(index),
      type: type as LocationType
    }
  }
};