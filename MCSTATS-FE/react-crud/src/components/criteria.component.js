import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveCriterias,
  findCriteriasByName,
  deleteAllCriterias,
} from "../actions/criterias";
import { Link } from "react-router-dom";

class Criterias extends Component {
  constructor(props) {
    super(props);
    this.onChangeCriteriaTitle = this.onChangeCriteriaTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCriteria = this.setActiveCriteria.bind(this);
    this.findCriteriasByProjectId = this.findCriteriasByProjectId.bind(this);
    this.removeAllCriterias = this.removeAllCriterias.bind(this);

    this.state = {
      currentCriteria: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveCriterias();
  }

  onChangeCriteriaTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentCriteria: null,
      currentIndex: -1,
    });
  }

  setActiveCriteria(criteria, index) {
    this.setState({
      currentCriteria: criteria,
      currentIndex: index,
    });
  }

  removeAllCriterias() {
    this.props
      .deleteAllCriterias()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findCriteriasByProjectId() {
    this.refreshData();

    this.props.findCriteriasByProjectId(this.state.project_id);
  }

  render() {
    const { searchTitle, currentCriteria, currentIndex } = this.state;
    const { criterias } = this.props;

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
                onClick={this.findCriteriasByProjectId}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Criteria List</h4>

          <ul className="list-group">
            {criterias &&
              criterias.map((criteria, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCriteria(criteria, index)}
                  key={index}
                >
                  {criteria.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCriterias}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCriteria ? (
            <div>
              <h4>Keywords</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCriteria.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCriteria.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCriteria.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/criterias/" + currentCriteria.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Keyword...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    criterias: state.criterias,
  };
};

export default connect(mapStateToProps, {
  retrieveCriterias,
  findCriteriasByProjectId,
  deleteAllCriterias,
})(Criterias);
