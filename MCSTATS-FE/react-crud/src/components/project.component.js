import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProject, deleteProject } from "../actions/projects";
import ProjectDataService from "../services/projects.service";

class Project extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProject = this.getProject.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeProject = this.removeProject.bind(this);

    this.state = {
      currentProject: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProject(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProject: {
          ...prevState.currentProject,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProject: {
        ...prevState.currentProject,
        description: description,
      },
    }));
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

  updateStatus(status) {
    var data = {
      id: this.state.currentProject.id,
      title: this.state.currentProject.title,
      description: this.state.currentProject.description,
      published: status,
    };

    this.props
      .updateProject(this.state.currentProject.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentProject: {
            ...prevState.currentProject,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updatePage(this.state.currentProject.id, this.state.currentProject)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The project was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePage() {
    this.props
      .deletePage(this.state.currentProject.id)
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
                  value={currentProject.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProject.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentProject.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentProject.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

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
