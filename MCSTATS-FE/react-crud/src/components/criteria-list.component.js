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
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.findByProjectId();
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

  findByProjectId() {
    console.log(this.project_id);
    this.refreshData(); 
    this.props.findByProjectId(this.project_id);
  }

  render() {
    const { currentProject, currentCriteria, currentIndex } = this.state;
    const { criterias } = this.props;

    return (
      
      <div className="list row">
        <div className="col-md-6">
            <Link
                to={"/socialcriterias/"}
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
    criterias: state.criterias,
    project_id: state.project_id,
  };
};

export default connect(mapStateToProps, {
  retrieveCriterias,
  findByProjectId,
  deleteAllCriterias,
})(CriteriaList);
