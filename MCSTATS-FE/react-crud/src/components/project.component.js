import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProject, deleteProject } from "../actions/projects";
import ProjectDataService from "../services/projects.service";

class Project extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeProjectName.bind(this);
    this.getProject = this.getProject.bind(this);
    this.removeProject = this.removeProject.bind(this);

    this.state = {
      currentProject: {
        project_id: null,
        project_name: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProject(this.props.match.params.project_id);
  }

  onChangeProjectName(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProject: {
          ...prevState.currentProject,
          project_name: title,
        },
      };
    });
  }

  getProject(id) {
    ProjectDataService.get(id)
      .then((response) => {
        this.setState({
          currentProject: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeProject() {
    this.props
      .deletePage(this.state.currentProject.project_id)
      .then(() => {
        this.props.history.push("/Projects");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePage() {
    this.props
      .deletePage(this.state.currentProject.project_id)
      .then(() => {
        this.props.history.push("/Projects");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentProject } = this.state;

    return (
      <div>
        {currentProject ? (
          <div className="edit-form">
            <h4>Page</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProject.project_name}
                  onChange={this.onChangeTitle}
                />
              </div>

            </form>

            

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeProject}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Project...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateProject, deleteProject })(Project);
