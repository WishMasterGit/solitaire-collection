import {
  Accordion,
  stockClick,
  create,
  autoDeal,
  selectCard,
  moveCard,
  gameEnded,
} from '../../src/games/accordion';

describe('accordion', () => {
  test('stock click', () => {
    let game: Accordion = create();
    expect(game.tableau.cards.length).toEqual(0);
    let result = stockClick(game);
    expect(result[1].tableau.cards.length).toBeGreaterThan(0);
    expect(result[1].tableau.cards[0]).toEqual(result[0]);
  });
  test('auto deal', () => {
    let game: Accordion = create();
    expect(game.tableau.cards.length).toEqual(0);
    let result = autoDeal(game);
    expect(result.tableau.cards.length).toEqual(52);
    expect(result.stock.decks[0].cards.length).toEqual(0);
  });
  test('match', () => {
    let game: Accordion = create('seed');
    let dealt = autoDeal(game);
    let card = selectCard(dealt, 50);
    let toCard = selectCard(dealt, 47);
    let result = moveCard(dealt, card, 47);
    expect(result[0].tableau.cards.length).toEqual(51);
    expect(result[1]).toEqual(true);
    expect(result[0].tableau.cards).not.toContainEqual(toCard[1]);
    expect(gameEnded(result[0])).toEqual(false);
  });
});
