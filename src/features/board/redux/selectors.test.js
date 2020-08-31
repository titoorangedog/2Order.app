import { sortByCities } from './selectors';

describe('selectors.test', () => {
  it(`
  GIVEN some cities
  WHEN I try to sort them
  THEN I should have ordered cities`, () => {
    // when
    const cities = [{ city: 'zurich' }, { city: 'alaska' }, { city: 'bangladesh' }];

    const sorted = sortByCities(cities);

    // then
    expect(sorted[0].city).toBe('alaska');
    expect(sorted[1].city).toBe('bangladesh');
    expect(sorted[2].city).toBe('zurich');
  });
});
