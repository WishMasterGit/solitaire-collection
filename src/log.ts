import { Action, Card, Location, ActionType } from './solitaireTypes';

function logCard(card:Card){
  return `card:${card.rank}${card.suit} face:${card.face}; loc:${card.location.type}${card.location.index}`
}

function logLocation(location:Location){
  return `loc:${location.type}${location.index}`
}

export function log(action:Action, text:string){
  let result = ""
  switch(action.type)
  {
    case ActionType.Card:
      let card = action.value as Card;
      result = `${logCard(card)}`
      break;
    case ActionType.Location:
      let location = action.value as Location;
      result = `${logLocation(location)}`
      break;
  }
  console.log(result)
  return `${result} ${text}`
}