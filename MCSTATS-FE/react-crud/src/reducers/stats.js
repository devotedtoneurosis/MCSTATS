import {
    RETRIEVE_STATS,
  } from "../actions/types";
  
  const initialState = [];
  
  function statReducer(stats = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {  
      default:
        return stats;
    }
  };
  
  export default statReducer;