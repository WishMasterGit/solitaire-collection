import { DefaultDeck, shuffleDeck, cardHash } from '../src/deck';
import { Card, Suits, Face, LocationType} from '../src/solitaireTypes';

describe('default card deck', () => {
  it('should have', () => {
    let deck = DefaultDeck;
    expect(deck.cards.length).toEqual(52);
  });
});

describe('card hash', () => {
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
    let hash = cardHash(card)
    expect(hash).toEqual("c1C")
  });
});

describe('shuffle cards with seed', () => {
  it('should have', () => {
    let deck = DefaultDeck;
    let shuffle1 = shuffleDeck(deck);
    let shuffle2 = shuffleDeck(deck);
    let shuffle3 = shuffleDeck(deck, 'seed');
    expect(shuffle1).toEqual(shuffle2);
    expect(shuffle1).not.toEqual(shuffle3);
  });
});
