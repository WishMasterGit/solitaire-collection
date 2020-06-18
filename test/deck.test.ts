import { DefaultDeck, shuffleDeck, deckFromString } from '../src/deck';
import {hashCard, cardToString} from '../src/card'
import { Card, Suits, Face, LocationType} from '../src/solitaireTypes';

describe('deck functions test', () => {
  it('should have', () => {
    let deck = DefaultDeck;
    expect(deck.cards.length).toEqual(52);
  });
  it('should be', () => {
    let card:Card = {
      rank:1,
      suit:Suits.clubs,
      face:Face.Up,
      location:{
        index:0,
        type:LocationType.Deck
      }
    }
    let hash = hashCard(card)
    expect(hash).toEqual("c1C")
  });
  it('should have', () => {
    let deck = DefaultDeck;
    let shuffle1 = shuffleDeck(deck);
    let shuffle2 = shuffleDeck(deck);
    let shuffle3 = shuffleDeck(deck, 'seed');
    expect(shuffle1).toEqual(shuffle2);
    expect(shuffle1).not.toEqual(shuffle3);
  });

  test('deck from string', ()=>{
    const deckString = '10C1deck0;11C1deck0;12H1deck0'
    const deck = deckFromString(deckString)
    expect(cardToString(deck.cards[0])).toEqual('10C1deck0')
  })

});
