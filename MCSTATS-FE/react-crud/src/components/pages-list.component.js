import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrievePages,
  findPagesByTitle,
  deleteAllPages,
} from "../actions/pages";
import { Link } from "react-router-dom";

class PagesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllPages = this.removeAllPages.bind(this);

    this.state = {
      currentPage: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrievePages();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentPage: null,
      currentIndex: -1,
    });
  }

  setActivePage(page, index) {
    this.setState({
      currentPage: page,
      currentIndex: index,
    });
  }

  removeAllPages() {
    this.props
      .deleteAllPages()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findPagesByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentPage, currentIndex } = this.state;
    const { pages } = this.props;

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
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Pages List</h4>

          <ul className="list-group">
            {pages &&
              pages.map((page, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePage(page, index)}
                  key={index}
                >
                  {page.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPages}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPage ? (
            <div>
              <h4>Page</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPage.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPage.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPage.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/pages/" + currentPage.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Page...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pages: state.pages,
  };
};

export default connect(mapStateToProps, {
  retrievePages,
  findPagesByTitle,
  deleteAllPages,
})(PagesList);
