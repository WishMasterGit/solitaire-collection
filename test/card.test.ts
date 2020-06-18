import { cardFromString, cardToString } from '../src/card'
import { Card, Suits, Face, LocationType } from '../src/solitaireTypes';
describe('card operations tests', () => {
  test('card to string', () => {
    let card: Card = {
      rank: 10,
      suit: Suits.clubs,
      face: Face.Up,
      location: {
        index: 0,
        type: LocationType.Deck
      }
    }
    let cardString = cardToString(card);
    expect(cardString).toEqual("10C1deck0")
  });

  test('card from string', () => {
    let card: Card = {
      rank: 10,
      suit: Suits.clubs,
      face: Face.Up,
      location: {
        index: 0,
        type: LocationType.Deck
      }
    }
    let cardResult = cardFromString("10C1deck0")
    expect(cardResult).toEqual(card)
  });
})  