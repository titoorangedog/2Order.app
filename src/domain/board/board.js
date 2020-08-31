import produce from 'immer';
import { BoardBookmarkedAdded, BoardAdded } from './board.events';

const createDefault = () => ({
  changes: [],
  bookmarked: [],
});

const applyChange = produce((draft, event) => {
  draft.changes.push(event);

  switch (event.type) {
    case BoardBookmarkedAdded.type: {
      draft.bookmarked.push(event.buildingId);
      break;
    }
    default:
      break;
  }
});

export function createBoard() {
  const instance = createDefault();

  return applyChange(instance, new BoardAdded());
}

export function loadBoardFromEvents(...events) {
  let instance = createDefault();
  for (const event of events) {
    instance = applyChange(instance, event);
  }
  return instance;
}
