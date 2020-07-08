import _ from 'lodash';
import { Undo, Game } from 'solitaireTypes';
import produce, { castDraft } from 'immer';
export function updateUndo(undoStack: Undo, game: Game) {
  let result = undoStack;
  if (_.last(undoStack.stack) !== game) {
    result = produce(undoStack, draft => {
      draft.current = castDraft(game);
      draft.stack.push(castDraft(game));
    });
  }
  return result;
}

export function undo(undoStack: Undo) {
  if (undoStack.stack.length === 0) return undoStack;
  let game = _.last(undoStack.stack) as Game;
  let newUndoStack = produce(undoStack, draft => {
    draft.stack.pop();
    draft.current = castDraft(game);
  });
  return newUndoStack;
}
