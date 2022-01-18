import React, { Component } from "react";
import { connect } from "react-redux";
import {
  findByProjectId,
  deleteAllCriterias,
} from "../actions/criterias";
import { Link } from "react-router-dom";

class CriteriaList extends Component {
  constructor(props) {
    super(props);
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
    console.log("Initial set:"+this.props.project_id);
    this.props.findByProjectId(this.props.project_id);
  }

  findByProjectId() {
    this.props.findByProjectId(this.props.project_id);
    this.refreshData();
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
    const { project_id } = this.props.project_id;
    this.props
      .deleteAllCriterias(project_id)
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      }); 
  }


  render() {
    const { currentProject, currentCriteria, currentIndex } = this.state;
    const { criterias } = this.props;

    return (

      <div className="list row">
        <div className="col-md-8">
          <Link
                to={"/addcriteria/"}
                className="btn btn-outline-secondary"
              >
                Create New Keyword
              </Link>
        </div>

        <div className="col-md-6">
          <h4>Keyword List</h4>

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
                  {criteria.keyword}
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
              <h4>Keyword</h4>
              <div>
                <label>
                  <strong>Keyword:</strong>
                </label>{" "}
                {currentCriteria.keyword}
              </div>

              <Link
                to={"/criterias/" + currentCriteria}
                className="btn btn-outline-secondary"
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
  console.log(state);
  return {
    criterias: state.criterias,
  };
};

export default connect(mapStateToProps, {
  findByProjectId,
  deleteAllCriterias,
})(CriteriaList);
