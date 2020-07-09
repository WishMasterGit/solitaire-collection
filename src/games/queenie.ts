import { Game, LocationType, Deck, Locations, Games, Card, SuitColors } from '../solitaireTypes';
import { moveCards } from '../card';

export const createGame = (deck: Deck): Game => {
  let game: Game = {
    meta: {
      type: Games.Queenie,
    },
    board: {
      [LocationType.Stock]: [
        {
          cards: moveCards(deck.cards, Locations.Stock),
          location: Locations.Stock,
        },
      ],
      [LocationType.Tableau]: [
        { cards: [], location: Locations.Tableau0 },
        { cards: [], location: Locations.Tableau1 },
        { cards: [], location: Locations.Tableau2 },
        { cards: [], location: Locations.Tableau3 },
        { cards: [], location: Locations.Tableau4 },
        { cards: [], location: Locations.Tableau5 },
        { cards: [], location: Locations.Tableau6 },
      ],
      [LocationType.Foundation]: [
        { cards: [], location: Locations.Foundation0 },
        { cards: [], location: Locations.Foundation1 },
        { cards: [], location: Locations.Foundation2 },
        { cards: [], location: Locations.Foundation3 },
      ],
      [LocationType.Waste]: [{ cards: [], location: Locations.Waste0 }],
      [LocationType.Deck]: [],
    },
    rules: {
      [LocationType.Stock]: (_game, _from, _to): boolean => false,
      [LocationType.Tableau]: (_game, from, to): boolean => {
        let fromCard = from as Card;
        let toCard = to as Card;
        if (fromCard && toCard && fromCard.location !== toCard.location) {
          return (
            toCard.rank - fromCard.rank === 1 &&
            SuitColors.get(toCard.suit) !== SuitColors.get(fromCard.suit)
          );
        }
        return false;
      },
      [LocationType.Waste]: (_game, _from, _to): boolean => false,
      [LocationType.Foundation]: (_game, _from, _to): boolean => false,
      [LocationType.Deck]: (_game, _from, _to): boolean => false,
    },
  };
  return game;
};
