import React, { Component } from "react";
import { BrowserRouter as Router, Routes ,Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Page from "./components/page.component";
import PagesList from "./components/pages-list.component";
import StatsList from "./components/stat-list.component";
import ProjectsList from "./components/project-list.component";
import AddProject from "./components/add-project.component";
import KeywordsList from "./components/criteria.component";

class App extends Component {
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
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/socialcriterias"} className="nav-link">
                Keywords
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/pages"} className="nav-link">
                Pages
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/stat"} className="nav-link">
                Stat Timeline
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<ProjectsList/>} />
            <Route exact path="/projects" element={<ProjectsList/>} />
            <Route exact path="/addproject" element={<AddProject/>} />
            <Route exact path="/socialcriterias" element={<KeywordsList/>} />
            <Route exact path="/pages" element={<PagesList/>} />
            <Route exact path="/stat" element={<StatsList/>} />
            <Route path="/pages/:id" element={<Page/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;