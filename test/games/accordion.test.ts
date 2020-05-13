import {
  Accordion,
  stockClick,
  create,
  autoDeal,
  selectCard,
  moveCard,
  gameEnded,
  anyMovesLeft
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
    let toCard = selectCard(dealt, 47);
    let result = moveCard(dealt, 50, 47);
    expect(result[1].tableau.cards.length).toEqual(51);
    expect(result[0]).toEqual(true);
    expect(result[1].tableau.cards).not.toContainEqual(toCard[1]);
    expect(gameEnded(result[1])).toEqual(false);
  });
  test('any moves method works', () => {
    const game: Accordion = create('seed');
    const dealt = autoDeal(game);
    const [anyMoves,from,to] = anyMovesLeft(dealt)
    expect(anyMoves).toBeTruthy();
    expect(from).toEqual(3);
    expect(to).toEqual(0);
  });
  test('autoplay till game end', () => {
    const game: Accordion = create('seed');
    let dealt = autoDeal(game);
    let canMove = true
    while(canMove){
      const [anyMoves,from,to] = anyMovesLeft(dealt)
      canMove = anyMoves
      dealt = moveCard(dealt,from,to)[1]
    }
    expect(gameEnded(dealt)).toBeTruthy()
  });
});
