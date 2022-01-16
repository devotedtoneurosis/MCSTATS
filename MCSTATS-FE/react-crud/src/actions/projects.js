import {
  CREATE_PROJECT,
  RETRIEVE_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  DELETE_ALL_PROJECTS
} from "./types";

import ProjectsDataService from "../services/projects.service";

export const createProject = (project_namen) => async (dispatch) => {
  try {
    const res = await ProjectsDataService.create({ project_name });

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

export const updateProject = (project_id, data) => async (dispatch) => {
  try {
    const res = await ProjectsDataService.update(project_id, data);

    dispatch({
      type: UPDATE_PROJECT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProject = (project_id) => async (dispatch) => {
  try {
    await ProjectsDataService.delete(project_id);

    dispatch({
      type: DELETE_PROJECT,
      payload: { project_id },
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

export const findProjectsByName = (project_name) => async (dispatch) => {
  try {
    const res = await ProjectsDataService.findByProjectName(title);

    dispatch({
      type: RETRIEVE_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};