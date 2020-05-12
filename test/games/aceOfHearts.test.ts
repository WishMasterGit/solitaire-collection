import {
  AceOfHearts,
  create,
  initialDeal
} from '../../src/games/aceOfHearts';
describe('accordion', () => {
  test('stock click', () => {
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
});