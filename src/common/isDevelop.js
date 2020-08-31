export const isDevelop =
  window.location.host === 'localhost:3000' || window.location.search.includes('?dev');
