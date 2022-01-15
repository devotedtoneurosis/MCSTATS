import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveStats,
} from "../actions/stats";
import { Link } from "react-router-dom";

class StatsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);

    this.state = {
      currentStat: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.props.retrieveStats();
  }

  refreshData() {
    this.setState({
      currentIndex: -1,
    });
  }


  render() {
    const { currentIndex } = this.state;
    const { stats } = this.props;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Stats List</h4>

          <ul className="list-group">
            {stats &&
              stats.map((page, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  {stats.title}
                </li>
              ))}
          </ul>
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
  retrieveStats,
})(StatsList);
