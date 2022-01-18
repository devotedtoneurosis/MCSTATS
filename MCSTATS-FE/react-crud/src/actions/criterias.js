import {
  CREATE_CRITERIA,
  RETRIEVE_CRITERIAS,
  UPDATE_CRITERIA,
  DELETE_CRITERIA,
  DELETE_ALL_CRITERIAS
} from "./types";

import CriteriasDataService from "../services/criterias.service";

export const createCriteria = ( project_id,keyword ) => async (dispatch) => {
  try {
    const res = await CriteriasDataService.create({ project_id,keyword });

    dispatch({
      type: CREATE_CRITERIA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveCriterias = () => async (dispatch) => {
  try {
    const res = await CriteriasDataService.getAll();

    dispatch({
      type: RETRIEVE_CRITERIAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCriteria = (id, data) => async (dispatch) => {
  try {
    const res = await CriteriasDataService.update(id, data);

    dispatch({
      type: UPDATE_CRITERIA,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCriteria = (id) => async (dispatch) => {
  try {
    await CriteriasDataService.delete(id);

    dispatch({
      type: DELETE_CRITERIA,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllCriterias = (project_id) => async (dispatch) => {
  try {
    const res = await CriteriasDataService.deleteAll(project_id);

    dispatch({
      type: DELETE_ALL_CRITERIAS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findByProjectId = (project_id) => async (dispatch) => {
  try {
    const res = await CriteriasDataService.findByProjectId(project_id);

    dispatch({
      type: RETRIEVE_CRITERIAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};