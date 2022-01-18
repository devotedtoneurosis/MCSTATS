import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject} from "../actions/projects";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeGameId= this.onChangeGameId.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.newProject = this.newProject.bind(this);

    this.state = {
      project_id: null,
      project_name: "",
      game_id: "",

      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      project_name: e.target.value,
    });
  }

  onChangeGameId(e) {
    this.setState({
      game_id: e.target.value,
    });
  }

  saveProject() {
    const { project_name, game_id } = this.state;
    console.log("PN:"+project_name);
    this.props
      .createProject(project_name, game_id)
      .then((data) => {
        this.setState({
          project_name: data.project_name,
          game_id: data.game_id,

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
      game_id: "",

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
              <label htmlFor="project_name">Project Name</label>
              <input
                type="text"
                className="form-control"
                name="project_name"
                required
                value={this.state.project_name}
                onChange={this.onChangeName}
              />
              <label htmlFor="game_id">Steam Game ID</label>
              <input
                type="text"
                className="form-control"
                name="game_id"
                required
                value={this.state.game_id}
                onChange={this.onChangeGameId}
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
