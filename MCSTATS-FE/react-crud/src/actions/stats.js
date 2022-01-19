import {
    RETRIEVE_STATS,
  } from "./types";
  
  import StatsDataService from "../services/stats.service";

  export const retrieveStatsByProject = (project_id) => async (dispatch) => {
    try {
      const res = await StatsDataService.findByProject(project_id);
  
      dispatch({
        type: RETRIEVE_STATS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
    
  };
