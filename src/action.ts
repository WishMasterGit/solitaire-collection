import {
  Actions,
  Action,
  ActionType,
  ActionFunction,
  ActionResult,
  GameBoard,
} from 'solitaireTypes';
import produce from 'immer';
import _ from 'lodash';
export function newAction(actions: Actions, action: Action): Actions {
  return produce(actions, draft => {
    draft.push(action);
  });
}

export function actionsHash(actions: Actions): string {
  return actions.map(a => a.type as ActionType).join('-');
}

export function actionsTypeHash(actions: ActionType[]): string {
  return actions.join('-');
}

export function createSet(): Map<String, ActionFunction> {
  return new Map<String, ActionFunction>();
}

export function setDefault(
  set: Map<String, ActionFunction>,
  func: ActionFunction
): Map<String, ActionFunction> {
  set.set('default', func);
  return set;
}

export const execute = _.curry(
  (
    set: Map<String, ActionFunction>,
    game: GameBoard,
    actions: Actions
  ): ActionResult => {
    let action = set.get(actionsHash(actions));
    console.log(`action: ${JSON.stringify(actions)}`);
    if (action) {
      return action(game, actions);
    }
    return (set.get('default') as ActionFunction)(game, actions);
  }
);
