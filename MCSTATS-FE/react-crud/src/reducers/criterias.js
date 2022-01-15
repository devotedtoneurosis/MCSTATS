import {
  CREATE_CRITERIA,
  RETRIEVE_CRITERIAS,
  UPDATE_CRITERIA,
  DELETE_CRITERIA,
  DELETE_ALL_CRITERIAS,
} from "../actions/types";

const initialState = [];

function criteriaReducer(criterias = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CRITERIA:
      return [...criterias, payload];

    case RETRIEVE_CRITERIAS:
      return payload;

    case UPDATE_CRITERIA:
      return criterias.map((page) => {
        if (criteria.id === payload.id) {
          return {
            ...criteria,
            ...payload,
          };
        } else {
          return criteria;
        }
      });

    case DELETE_CRITERIA:
      return criterias.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_CRITERIAS:
      return [];

    default:
      return criterias;
  }
};

export default criteriaReducer;