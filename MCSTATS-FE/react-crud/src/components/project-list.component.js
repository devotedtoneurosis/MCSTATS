import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PropTypes } from 'react'
import {
  retrieveProjects,
  findProjectsByName,
  deleteAllProjects,
} from "../actions/projects";


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectTitle = this.onChangeProjectTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.findProjectsByName = this.findProjectsByName.bind(this);
    this.removeAllProjects = this.removeAllProjects.bind(this);
    this.projectCallback = this.projectCallback.bind(this);

    this.state = {
      currentProject: null,
      project_id: -1,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveProjects();
  }

  projectCallback(pid){
    console.log("trying callback with:"+pid);
    this.props.projectCallback(pid);
  }



  onChangeProjectTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentProject: null,
      currentIndex: -1,
    });
  }

  setActiveProject(project, index) {
    this.setState({
      currentProject: project,
      currentIndex: index,
    });
    this.projectCallback(project.project_id)
  }

  removeAllProjects() {
    this.props
      .deleteAllProjects()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findProjectsByName() {
    this.refreshData();

    this.props.findProjectsByName(this.props.match.params.id);
  }

  render() {
    const { searchTitle, currentProject, currentIndex } = this.state;
    const { projects } = this.props;

    return (


      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findProjectsByName}
              >
                Search
              </button>
            </div>
            


          </div>
          <Link
                to={"/addproject/"}
                className="btn btn-outline-secondary"
              >
                Create New Project
              </Link>
        </div>

        <div className="col-md-6">
          <h4>Projects List</h4>

          <ul className="list-group">
            {projects &&
              projects.map((project, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProject(project, index)}
                  key={index}
                >
                  {project.project_name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProjects}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProject ? (
            <div>
              <h4>Project</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentProject.project_name}
              </div>
              <div>
                <label>
                  <strong>GameID:</strong>
                </label>{" "}
                {currentProject.game_id}
              </div>

              <Link
                to={"/projects/" + currentProject.project_id}
                className="btn btn-outline-secondary"
              >
                Edit
              </Link>
              <Link
                to={"/socialcriterialist/"}
              >
                Criteria
              </Link>
              <Link
                onClick={this.projectCallback(currentProject.project_id)}
                to={"/stat/" + currentProject.project_id}
                className="btn btn-outline-secondary"
              >
                Timeline
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Project...</p>
            </div>
          )}
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    projects: state.projects,
  };
};

export default connect(mapStateToProps, {
  retrieveProjects,
  findProjectsByName,
  deleteAllProjects,
})(ProjectList);
