const initialState = {
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        data: action.data
      };
    default: {
      return state;
    }
  }
};

export default reducer;
