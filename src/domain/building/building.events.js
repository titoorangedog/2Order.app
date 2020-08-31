export class BuildingAdded {
  static type = 'BuildingAdded';
  type = BuildingAdded.type;
}

export class BuildingDesignationUpdated {
  designation = '';

  static type = 'BuildingDesignationUpdated';
  type = BuildingDesignationUpdated.type;

  constructor(designation) {
    this.designation = designation;
  }
}

export class BuildingDownloaded {
  building = null;

  static type = 'BuildingDownloaded';
  type = BuildingDownloaded.type;

  constructor(building) {
    this.building = building;
  }
}
