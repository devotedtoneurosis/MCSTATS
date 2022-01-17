import React, { Component } from "react";
import { connect } from "react-redux";
import { createCriteria } from "../actions/criterias";

class AddCriteria extends Component {
  constructor(props) {
    super(props);
    this.onChangeKeyword = this.onChangeKeyword.bind(this);
    this.saveCriteria = this.saveCriteria.bind(this);
    this.newCriteria = this.newCriteria.bind(this);

    this.state = {
      criteria_id: null,
      keyword: "",

      submitted: false,
    };
  }

  componentDidMount() {
    console.log("Props:"+this.props.id);
    this.state.project_id = this.props.match.params.id;
  }

  onChangeKeyword(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  saveCriteria() {
    const { keyword } = this.state;
    console.log("Project id:"+this.project_id);
    this.props
      .createCriteria(this.project_id, keyword)
      .then((data) => {
        this.setState({
          keyword: data.keyword,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newCriteria() {
    this.setState({
      criteria_id: null,
      keyword: "",

      submitted: false,
    });
  }

  render() {

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Keyword</label>
              <input
                type="text"
                className="form-control"
                keyword="keyword"
                required
                value={this.state.keyword}
                onChange={this.onChangeKeyword}
                name="keyword"
              />
            </div>

            <button onClick={this.saveCriteria} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project_id: state.project_id,
  };
};

export default connect(mapStateToProps, { createCriteria })(AddCriteria);
