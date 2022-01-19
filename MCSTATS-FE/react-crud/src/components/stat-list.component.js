import React, { Component } from "react";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import {
  retrieveStats,
  retrievePages,
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
    this.props.retrievePages();
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
          <h4>Trend View</h4>

          <Line
            datasetIdKey='id'
            data={{
              labels: ['Jan', 'Feb', 'March', 'April', 'May'],
              datasets: [
                {
                  id: 1,
                  type: 'bar',
                  label: '',
                  data: [5, 6, 7, 7, 7],
                },
                {
                  id: 2,
                  type: 'bubble',
                  label: '',
                  data: [3, 2, 1, 1, 1],
                },
              ],
            }}
          />

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
