import { createBuilding, updateDesignation } from './building';

describe('Building', () => {
  it(`
  WHEN trying to create a building 
  THEN should have isNew flag`, () => {
    // when
    const building = createBuilding();

    // then
    expect(building.isNew).toBeTruthy();
  });

  it(`
  GIVEN an existing building
  WHEN trying to update designation
  THEN should have updated designation
  `, () => {
    // given
    const building = createBuilding();

    // when
    const instance = updateDesignation(building, 'updated designation');

    // then
    expect(instance.designation).toBe('updated designation');
  });
});
