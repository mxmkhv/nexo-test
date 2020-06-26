const initialState = {
  countries: null,
  countryData: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        countries: action.data.Countries
      };
    case 'FETCH_COUNTRYDATA': {
      return {
        ...state,
        countryData: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
