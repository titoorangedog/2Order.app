import { createBoard, loadBoardFromEvents } from './board';
import { BoardAdded, BoardBookmarkedAdded } from './board.events';

describe('Board', () => {
  it(`
  WHEN trying to create a board 
  THEN should have no boomarks`, () => {
    // when
    const board = createBoard();

    // then
    expect(board.bookmarked.length).toBeFalsy();
  });

  it(`
  GIVEN an existing board
  WHEN trying to add a boomark
  THEN should have updated boomarks
  `, () => {
    // when
    const board = loadBoardFromEvents(new BoardAdded(), new BoardBookmarkedAdded(1));

    // then
    expect(board.bookmarked.length).toBeTruthy();
  });
});
