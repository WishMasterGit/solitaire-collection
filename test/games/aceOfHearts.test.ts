import {
  AceOfHearts,
  create,
  initialDeal,
  dealFromStock
} from '../../src/games/aceOfHearts';
describe('accordion', () => {
  test('initial deal', () => {
    let game: AceOfHearts = create();
    game = initialDeal(game)
    expect(game.tableau[0].cards.length).toEqual(1)
    expect(game.tableau[1].cards.length).toEqual(2)
    expect(game.tableau[2].cards.length).toEqual(3)
    expect(game.tableau[3].cards.length).toEqual(4)
    expect(game.tableau[4].cards.length).toEqual(5)
    expect(game.tableau[5].cards.length).toEqual(6)
    expect(game.tableau[6].cards.length).toEqual(7)
  });
  test('stock click', () => {
    let game: AceOfHearts = create();
    game = initialDeal(game)
    game = dealFromStock(game)
    expect(game.tableau[0].cards.length).toEqual(2)
    expect(game.tableau[1].cards.length).toEqual(3)
    expect(game.tableau[2].cards.length).toEqual(4)
    expect(game.tableau[3].cards.length).toEqual(5)
    expect(game.tableau[4].cards.length).toEqual(6)
    expect(game.tableau[5].cards.length).toEqual(7)
    expect(game.tableau[6].cards.length).toEqual(8)
  });
});