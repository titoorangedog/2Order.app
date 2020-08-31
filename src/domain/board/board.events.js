export class BoardAdded {
  static type = 'BoardAdded';
  type = BoardAdded.type;
}

export class BoardBookmarkedAdded {
  static type = 'BoardBookmarkedAdded';
  type = BoardBookmarkedAdded.type;

  constructor(buildingId) {
    this.buildingId = buildingId;
  }
}
