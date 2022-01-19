import {
  CREATE_PAGE,
  RETRIEVE_PAGES,
  UPDATE_PAGE,
  DELETE_PAGE,
  DELETE_ALL_PAGES
} from "./types";

import PagesDataService from "../services/pages.service";

export const createPage = (title, description) => async (dispatch) => {
  try {
    const res = await PagesDataService.create({ title, description });

    dispatch({
      type: CREATE_PAGE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePages = () => async (dispatch) => {
  try {
    const res = await PagesDataService.getAll();

    dispatch({
      type: RETRIEVE_PAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePage = (id, data) => async (dispatch) => {
  try {
    const res = await PagesDataService.update(id, data);

    dispatch({
      type: UPDATE_PAGE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deletePage = (id) => async (dispatch) => {
  try {
    await PagesDataService.delete(id);

    dispatch({
      type: DELETE_PAGE,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllPages = () => async (dispatch) => {
  try {
    const res = await PagesDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_PAGES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrievePagesByProject = (project_id) => async (dispatch) => {
  try {
    const res = await PagesDataService.findByProject(project_id);

    dispatch({
      type: RETRIEVE_PAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};