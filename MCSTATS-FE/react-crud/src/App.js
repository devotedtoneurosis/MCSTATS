import React, { Component } from "react";
import { BrowserRouter as Router, Routes ,Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProjectsList from "./components/project-list.component";
import AddProject from "./components/add-project.component";
import KeywordsList from "./components/criteria-list.component";
import AddCriteria from "./components/add-criteria.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.updateActiveProject = this.updateActiveProject.bind(this);
    this.state = {
      project_id:-1,
    };
  }

  updateActiveProject(proj_id) {
    console.log("triggered callback:"+proj_id)
    this.setState({
      project_id: proj_id,
    });
  }

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            MCAPI
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/projects"} className="nav-link">
                My Projects
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<ProjectsList projectCallback={this.updateActiveProject}/>} />
            <Route exact path="/addproject" element={<AddProject/>} />
            <Route exact path="/socialcriterialist/" element={<KeywordsList project_id={this.state.project_id} projectCallback={this.updateActiveProject}/>} />
            <Route exact path="/addcriteria/" element={<AddCriteria project_id={this.state.project_id} projectCallback={this.updateActiveProject}/>} />
          </Routes>
        </div>



      </Router>
    );
  }
}

export default App;