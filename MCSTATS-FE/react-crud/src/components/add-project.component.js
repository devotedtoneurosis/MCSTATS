import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject} from "../actions/projects";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    this.state = {
      project_id: null,
      project_name: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }


  saveProject() {
    const { name } = this.state;

    this.props
      .createProject(name)
      .then((data) => {
        this.setState({
          project_id: data.project_id,
          project_name: data.project_name,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProject() {
    this.setState({
      project_id: null,
      name: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProject}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="name"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <button onClick={this.saveProject} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createProject })(AddProject);
