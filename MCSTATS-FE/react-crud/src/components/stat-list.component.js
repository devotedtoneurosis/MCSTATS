import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveStatsByProject,
} from "../actions/stats";
import {
  retrievePagesByProject,
} from "../actions/pages";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


class StatsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.retrieveStatsByProject = this.retrieveStatsByProject.bind(this);
    this.retrievePagesByProject = this.retrievePagesByProject.bind(this);

    this.state = {
      pages: null,
      stats: null,
      statDistribution: [],
      pageDistribution: [],
      yearIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveStatsByProject();
    this.retrievePagesByProject(); 

  }

  retrieveStatsByProject() {
    this.props.retrieveStatsByProject(this.props.project_id);
    this.refreshData();
  }

  retrievePagesByProject() {
    this.props.retrievePagesByProject(this.props.project_id);
    this.refreshData();
  }

  refreshData() {
    //this.setState({
    //  pages: this.state.pages,
    //  stats: this.state.stats,
    //});


  }


  updateStatistics() {
    //initialize intervals
    var yearIndex = new Array(365);

    if(this.props.stats != null){
      //gather stat interval
      this.state.statDistribution = [];
      for (let i = 0; i < yearIndex.length; i++) {
        var ind = 0;
        for (let x = 0; x < this.props.stats.length; x++) {
          console.log(this.props.stats[i]);
          if (this.props.stats[i].timestamp.timetuple().tm_yday == i){
            this.state.statDistribution[i,ind] = this.props.stats[i];
            ind++;
          }
        }
      }
    }else{
      console.log("stats are null...");
    }

    if(this.props.pages != null){
      //gather page interval
      this.state.pageDistribution = [];
      for (let i = 0; i < yearIndex.length; i++) {
        var ind = 0;
        for (let x = 0; x < this.props.pages.length; x++) {
          if (this.props.pages[i].timestamp.timetuple().tm_yday == i){
            this.state.pageDistribution[i,ind] = this.props.pages[i];
            ind++;
          }
        }
      }
    }else{
      console.log("pages are null...");
    }

  }



  render() {
    const { stats,pages } = this.props;
    console.log("STATS:"+stats);
    console.log("PAGES:"+pages);
    //this.updateStatistics();

    return (

      <>
        <h1 className="text-heading">
            Line Chart Using Rechart
        </h1>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={stats} margin={{ right: 300 }}>
            <CartesianGrid />
            <XAxis dataKey="timestamp" 
                interval={'preserveStartEnd'} />
            <YAxis dataKey="player_count" 
                interval={'preserveStartEnd'}></YAxis>
            <Legend />
            <Tooltip />
            <Line dataKey="student"
                stroke="black" activeDot={{ r: 8 }} />
            <Line dataKey="fees"
                stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </>

    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    pages: state.pages,
    stats: state.stats,
  };
};

export default connect(mapStateToProps, {
  retrieveStatsByProject,
  retrievePagesByProject,
})(StatsList);