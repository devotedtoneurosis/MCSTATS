import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePage, deletePage } from "../actions/pages";
import PageDataService from "../services/pages.service";

class Page extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPage = this.getPage.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removePage = this.removePage.bind(this);

    this.state = {
      currentPage: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getPage(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPage: {
          ...prevState.currentPage,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentPage: {
        ...prevState.currentPage,
        description: description,
      },
    }));
  }

  getPage(id) {
    PageDataService.get(id)
      .then((response) => {
        this.setState({
          currentPage: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentPage.id,
      title: this.state.currentPage.title,
      description: this.state.currentPage.description,
      published: status,
    };

    this.props
      .updateTutorial(this.state.currentPage.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentPage: {
            ...prevState.currentPage,
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
      .updatePage(this.state.currentPage.id, this.state.currentPage)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The tutorial was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePage() {
    this.props
      .deletePage(this.state.currentPage.id)
      .then(() => {
        this.props.history.push("/Pages");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        {currentPage ? (
          <div className="edit-form">
            <h4>Page</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPage.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPage.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPage.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPage.published ? (
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
            <p>Please click on a Page...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updatePage, deletePage })(Page);
