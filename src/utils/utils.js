export const sortByDate = (data, prop) => {
  return data.sort((a, b) => new Date(prop ? b[prop] : b) - new Date(prop ? a[prop] : a));
};

export const sortCountries = (countries, order, key) => {
  if (order === 'ascending') {
    return countries.sort((a, b) => (a[key] < b[key] ? 1 : -1));
  }
  if (order === 'descending') {
    return countries.sort((a, b) => (a[key] < b[key] ? -1 : 1));
  }
};

export const formatNumber = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
