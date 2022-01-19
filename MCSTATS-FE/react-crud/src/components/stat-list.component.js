import React, { Component } from "react";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import {
  retrieveStats,
} from "../actions/stats";
import {
  retrievePages,
} from "../actions/pages";
import { Link } from "react-router-dom";


class StatsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.retrieveStats = this.retrieveStats.bind(this);
    this.retrievePages = this.retrievePages.bind(this);

    this.state = {
      stats: null,
      pages: null,
      currentStat: null,
      currentStatIndex: -1,
      currentPage: null,
      currentPageIndex: -1,
      statDistribution: [],
      pageDistribution: [],
      yearIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveStats();
    this.retrievePages();
    this.refreshData();
  }

  retrieveStats() {
    this.props.retrieveStats();
  }

  retrievePages() {
    this.props.retrievePages();
  }

  refreshData() {

    //initialize intervals
    var yearIndex = [];
    for (let d=0;d<365;d++) {
      yearIndex[d] = d;
    }

    //gather stat interval
    this.state.statDistribution = []
    for (let i = 0; i < yearIndex.length; i++) {
      var ind = 0;
      for (let x = 0; x < this.state.stats.length; x++) {
        if (this.state.stats[i].timestamp.timetuple().tm_yday == i){
          this.state.statDistribution[i,ind] = this.state.stats[i];
          ind++;
        }
      }
    }

    //gather page interval
    this.state.pageDistribution = []
    for (let i = 0; i < yearIndex.length; i++) {
      var ind = 0;
      for (let x = 0; x < this.state.pages.length; x++) {
        if (this.state.pages[i].timestamp.timetuple().tm_yday == i){
          this.state.pageDistribution[i,ind] = this.state.pages[i];
          ind++;
        }
      }
    }

    this.setState({
      currentStatIndex: -1,
      currentPageIndex: -1,
    });
  }


  render() {
    const { stats,pages } = this.props;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Trend View</h4>

          <Line
            datasetIdKey='id'
            data={{
              labels: ['1', '8', '15', '22', '29', '5', '12', '19'],
              datasets: [
                {
                  id: 1,
                  type: 'bar',
                  label: 'Steam Players',
                  data: [5, 6, 7, 7, 7],
                },
                {
                  id: 2,
                  type: 'bubble',
                  label: 'Posts',
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
