import {
  CREATE_PROJECT,
  RETRIEVE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  DELETE_ALL_PROJECTS
} from "./types";

import ProjectsDataService from "../services/projects.service";

export const createProject = (title, description) => async (dispatch) => {
  try {
    const res = await ProjectsDataService.create({ title, description });

    dispatch({
      type: CREATE_PROJECT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveProjects = () => async (dispatch) => {
  try {
    const res = await ProjectsDataService.getAll();

    dispatch({
      type: RETRIEVE_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    const res = await ProjectsDataService.update(id, data);

    dispatch({
      type: UPDATE_PROJECT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await ProjectsDataService.delete(id);

    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllProjects = () => async (dispatch) => {
  try {
    const res = await ProjectsDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_PROJECTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findProjectsByTitle = (title) => async (dispatch) => {
  try {
    const res = await ProjectsDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};