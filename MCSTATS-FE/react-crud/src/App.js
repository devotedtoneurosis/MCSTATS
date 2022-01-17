import React, { Component } from "react";
import { BrowserRouter as Router, Routes ,Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProjectsList from "./components/project-list.component";
import AddProject from "./components/add-project.component";
import KeywordsList from "./components/criteria-list.component";


class App extends Component {

  updateActiveProject(proj) {
    console.log("triggered callback:"+proj)
    this.setState({
      currentProject: proj,
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
            <Route exact path="/" element={<ProjectsList/>} />
            <Route exact path="/addproject" element={<AddProject/>} />
            <Route exact path="/socialcriterialist/:id" element={<KeywordsList/>} />
          </Routes>
        </div>



      </Router>
    );
  }
}

export default App;