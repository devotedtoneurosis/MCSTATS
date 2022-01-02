import {
    RETRIEVE_STATS,
  } from "./types";
  
  import PagesDataService from "../services/stats.service";

  export const retrieveStats = () => async (dispatch) => {
    try {
      const res = await StatsDataService.getAll();
  
      dispatch({
        type: RETRIEVE_STATS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };