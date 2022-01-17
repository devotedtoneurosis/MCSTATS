import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveCriterias,
  findByProjectId,
  deleteAllCriterias,
} from "../actions/criterias";
import { Link } from "react-router-dom";

class CriteriaList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchCriteriaTitle = this.onChangeSearchCriteriaTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCriteria = this.setActiveCriteria.bind(this);
    this.findByProjectId = this.findByProjectId.bind(this);
    this.removeAllCriterias = this.removeAllCriterias.bind(this);

    this.state = {
      currentCriteria: null,
      currentIndex: -1,
      project_id: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.setState({
      project_id: this.props.project_id,
    });
    console.log("Initial set:"+this.state.project_id);
    this.findByProjectId();
  }

  refreshData() {
    this.setState({
      currentCriteria: null,
      project_id: this.props.project_id,
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

  findByProjectId() {
    this.props.findByProjectId(this.state.project_id);
  }

  render() {
    const { currentProject, currentCriteria, currentIndex } = this.state;
    const { criterias } = this.props;

    return (
      
      <div className="list row">
        <div className="col-md-6">
            <Link
                to={"/addcriteria/"}
                className="btn btn-outline-secondary"
              >
                Add Keyword
              </Link>
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
                to={"/projects/"}
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


export default connect(null, {
  retrieveCriterias,
  findByProjectId,
  deleteAllCriterias,
})(CriteriaList);
