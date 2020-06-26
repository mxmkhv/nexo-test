const initialState = {
  countries: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        countries: action.data.Countries
      };
    default: {
      return state;
    }
  }
};

export default reducer;
