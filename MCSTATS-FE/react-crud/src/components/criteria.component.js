import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCriteria, deleteCriteria } from "../actions/criterias";
import CriteriaDataService from "../services/criterias.service";

class Criteria extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCriteria = this.getCriteria.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeCriteria = this.removeCriteria.bind(this);

    this.state = {
      currentCriteria: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getCriteria(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCriteria: {
          ...prevState.currentCriteria,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCriteria: {
        ...prevState.currentCriteria,
        description: description,
      },
    }));
  }

  getCriteria(id) {
    CriteriaDataService.get(id)
      .then((response) => {
        this.setState({
          currentCriteria: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentCriteria.id,
      title: this.state.currentCriteria.title,
      description: this.state.currentCriteria.description,
      published: status,
    };

    this.props
      .updateTutorial(this.state.currentCriteria.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentCriteria: {
            ...prevState.currentCriteria,
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
      .updateCriteria(this.state.currentCriteria.id, this.state.currentCriteria)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeCriteria() {
    this.props
      .deleteCriteria(this.state.currentCriteria.id)
      .then(() => {
        this.props.history.push("/Criterias");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCriteria } = this.state;

    return (
      <div>
        {currentCriteria ? (
          <div className="edit-form">
            <h4>Criteria</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCriteria.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCriteria.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCriteria.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCriteria.published ? (
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
              onClick={this.removeTutorial}
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
            <p>Please click on a Criteria...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateCriteria, deleteCriteria })(Criteria);
