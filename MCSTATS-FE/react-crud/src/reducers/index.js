import { combineReducers } from "redux";
import pages from "./pages";
import projects from "./projects";
import criterias from "./criterias";
import stats from "./stats";

export default combineReducers({
  pages,
  projects,
  criterias,
  stats,
});
