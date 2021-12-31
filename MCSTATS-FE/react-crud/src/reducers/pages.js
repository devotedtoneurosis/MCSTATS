import {
  CREATE_PAGE,
  RETRIEVE_PAGES,
  UPDATE_PAGE,
  DELETE_PAGE,
  DELETE_ALL_PAGES,
} from "../actions/types";

const initialState = [];

function pageReducer(pages = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PAGE:
      return [...pages, payload];

    case RETRIEVE_PAGES:
      return payload;

    case UPDATE_PAGE:
      return pages.map((page) => {
        if (page.id === payload.id) {
          return {
            ...page,
            ...payload,
          };
        } else {
          return page;
        }
      });

    case DELETE_PAGE:
      return pages.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_PAGES:
      return [];

    default:
      return pages;
  }
};

export default pageReducer;