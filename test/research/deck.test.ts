import { DefaultDeck, shuffleDeck } from '../../src/research/deck';

describe('default card deck', () => {
  it('should have', () => {
    let deck = DefaultDeck;
    expect(deck.cards.length).toEqual(52);
  });
});

describe('shuffle cards with seed', () => {
  it('should have', () => {
    let deck = DefaultDeck;
    let shuffle1 = shuffleDeck(deck)
    let shuffle2 = shuffleDeck(deck)
    let shuffle3 = shuffleDeck(deck,"seed")
    expect(shuffle1).toEqual(shuffle2)
    expect(shuffle1).not.toEqual(shuffle3)
  });
});