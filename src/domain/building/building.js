import produce from 'immer';
import { BuildingAdded, BuildingDesignationUpdated, BuildingDownloaded } from './building.events';

const createDefault = () => ({
  changes: [],
  isNew: false,
  buildingId: '',
  city: '',
  designation: '',
});
const applyChange = produce((draft, event) => {
  draft.changes.push(event);

  switch (event.type) {
    case BuildingAdded.type: {
      draft.isNew = true;
      break;
    }
    case BuildingDesignationUpdated.type: {
      draft.designation = event.designation;
      break;
    }
    case BuildingDownloaded.type: {
      draft.isNew = false;
      draft.buildingId = event.building.buildingId;
      draft.city = event.building.city;
      draft.designation = event.building.designation;
      break;
    }
    default:
      break;
  }
});

export function updateDesignation(instance, designation) {
  return applyChange(instance, new BuildingDesignationUpdated(designation));
}

export function createBuilding() {
  const instance = createDefault();

  return applyChange(instance, new BuildingAdded());
}

export function loadBuildingFromEvents(events) {
  let instance = createDefault();
  for (const event of events) {
    instance = applyChange(instance, event);
  }
  return instance;
}
