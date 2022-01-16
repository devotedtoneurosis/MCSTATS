import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveCriterias,
  findCriteriasByProjectId,
  deleteAllCriterias,
} from "../actions/criterias";
import { Link } from "react-router-dom";

class CriteriaList extends Component {
  constructor(props) {
    super(props);
    this.onChangeCriteriaTitle = this.onChangeCriteriaTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCriteria = this.setActiveCriteria.bind(this);
    this.findCriteriasByProjectId = this.findCriteriaById.bind(this);
    this.removeAllCriterias = this.removeAllCriterias.bind(this);

    this.state = {
      currentProject: null,
      currentCriteria: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveCriterias();
  }

  onChangeSearchCriteriaTitle(e) {
    const searchCriteriaTitle = e.target.value;

    this.setState({
      searchCriteriaTitle: searchCriteriaTitle,
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

    this.props.findCriteriasByProjectId(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentProject, currentCriteria, currentIndex } = this.state;
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
              onChange={this.onChangeSearchCriteriaTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findCriteriasByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Keywords List</h4>

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
                  {criteria.criteria_name}
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
          {currentProject ? (
            <div>
              <h4>Keyword</h4>
              <div>
                <label>
                  <strong>Keyword:</strong>
                </label>{" "}
                {currentCriteria.keyword}
              </div>

              <Link
                to={"/projects/" + currentProject.project_id}
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
    criterias: state.projects,
  };
};

export default connect(mapStateToProps, {
  retrieveCriterias,
  findCriteriasByName,
  deleteAllCriterias,
})(CriteriaList);
