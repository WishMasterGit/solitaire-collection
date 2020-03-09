import {DefaultDeck} from '../../src/research/deck'

describe('default card deck', () => {
  it('should have', () =>{
    let deck = DefaultDeck
    expect(deck.length).toEqual(52)
  })
})