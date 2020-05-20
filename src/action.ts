import { Actions, Action } from 'solitaireTypes';
import produce from 'immer';
export function newAction(actions: Actions, action: Action): Actions {
  return produce(actions, draft => {
    draft.push(action);
  });
}
