import produce, { Draft } from 'immer'
import { Card, Face} from 'solitaireTypes'
import _ from 'lodash'

export const turnCard = produce((card: Draft<Card>, face: Face) => {
  card.face = face
})
