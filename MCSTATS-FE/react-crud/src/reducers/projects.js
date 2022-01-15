import {
  CREATE_PROJECT,
  RETRIEVE_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  DELETE_ALL_PROJECTS,
} from "../actions/types";

const initialState = [];

function projectReducer(pages = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return [...projects, payload];

    case RETRIEVE_PROJECTS:
      return payload;

    case UPDATE_PROJECT:
      return projects.map((project) => {
        if (project.id === project.id) {
          return {
            ...project,
            ...payload,
          };
        } else {
          return project;
        }
      });

    case DELETE_PROJECT:
      return projects.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_PROJECTS:
      return [];

    default:
      return projects;
  }
};

export default projectReducer;