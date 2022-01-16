import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveProjects,
  findProjectsByName,
  deleteAllProjects,
} from "../actions/projects";
import { Link } from "react-router-dom";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.onChangeProjectTitle = this.onChangeProjectTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.findProjectsByName = this.findProjectsByName.bind(this);
    this.removeAllProjects = this.removeAllProjects.bind(this);

    this.state = {
      currentProject: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveProjects();
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

    this.props.findProjectsByName(this.state.searchTitle);
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
                to={"/projects/" + currentProject.id}
                className="badge badge-warning"
              >
                Edit
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
  return {
    projects: state.projects,
  };
};

export default connect(mapStateToProps, {
  retrieveProjects,
  findProjectsByName,
  deleteAllProjects,
})(ProjectList);