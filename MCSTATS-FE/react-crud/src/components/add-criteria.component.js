import React, { Component } from "react";
import { connect } from "react-redux";
import { createKeyword} from "../actions/criterias";

class AddCriteria extends Component {
  constructor(props) {
    super(props);
    this.onChangeKeyword = this.onChangeKeyword.bind(this);
    this.saveCriteria = this.saveCriteria.bind(this);
    this.newCriteria = this.newCriteria.bind(this);

    this.state = {
      criteria_id: null,
      project_id: null,
      keyword: "",

      submitted: false,
    };
  }

  onChangeKeyword(e) {
    this.setState({
      title: e.target.value,
    });
  }

  saveCriteria() {
    const { project_id, keyword } = this.state;

    this.props
      .createPage(project_id, keyword)
      .then((data) => {
        this.setState({
          project_id: data.project_id,
          keyword: data.keyword,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPage() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

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

            <button onClick={this.savePage} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createCriteria })(AddCriteria);
