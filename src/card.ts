import produce, { Draft } from 'immer';
import { Card, Face, Location } from 'solitaireTypes';
import _ from 'lodash';

export const turnCard = produce((card: Draft<Card>, face: Face) => {
  card.face = face;
});
export const moveCard = produce((card: Draft<Card>, locaiton: Location) => {
  card.location = locaiton;
});
