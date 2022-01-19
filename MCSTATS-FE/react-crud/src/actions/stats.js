import {
    RETRIEVE_STATS,
  } from "./types";
  
  import StatsDataService from "../services/stats.service";

  export const retrieveStats = (project_id) => async (dispatch) => {
    try {
      const res = await StatsDataService.getAllByProject(project_id);
  
      dispatch({
        type: RETRIEVE_STATS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };