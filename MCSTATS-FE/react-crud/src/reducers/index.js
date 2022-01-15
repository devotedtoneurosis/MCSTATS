import { combineReducers } from "redux";
import pages from "./pages";
import projects from "./projects";
import criterias from "./criterias";

export default combineReducers({
  pages,
  projects,
  criterias,
});
