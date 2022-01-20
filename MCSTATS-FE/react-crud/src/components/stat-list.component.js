import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveStatsByProject,
} from "../actions/stats";
import {
  retrievePagesByProject,
} from "../actions/pages";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';


class StatsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.retrieveStatsByProject = this.retrieveStatsByProject.bind(this);
    this.retrievePagesByProject = this.retrievePagesByProject.bind(this);

    this.state = {
      pages: [],
      stats: [],
      statDistribution: [],
      pageDistribution: [],
      yearIndex: -1,
    };
  }

  componentDidMount() {
    this.props.retrieveStatsByProject(this.props.project_id);
    this.props.retrievePagesByProject(this.props.project_id); 
  }

  retrieveStatsByProject(projid) {
    this.refreshData();
    console.log("Stats retrieved");
  }

  retrievePagesByProject(projid) {
    this.refreshData();
    console.log("Pages retrieved");
  }

  refreshData() {
    this.setState({
      pages: this.state.pages,
      stats: this.state.stats,
    });

    console.log(this.props);

    
    //initialize intervals
    var yearIndex = new Array(365);

    if(this.state.stats != null){
      //gather stat interval
      this.state.statDistribution = [];
      for (let i = 0; i < yearIndex.length; i++) {
        var ind = 0;
        for (let x = 0; x < this.state.stats.length; x++) {
          console.log(this.state.stats[i]);
          if (this.state.stats[i].timestamp.timetuple().tm_yday == i){
            this.state.statDistribution[i,ind] = this.state.stats[i];
            ind++;
          }
        }
      }
    }else{
      console.log("stats are null...");
    }

    if(this.state.pages != null){
      //gather page interval
      this.state.pageDistribution = [];
      for (let i = 0; i < yearIndex.length; i++) {
        var ind = 0;
        for (let x = 0; x < this.state.pages.length; x++) {
          if (this.state.pages[i].timestamp.timetuple().tm_yday == i){
            this.state.pageDistribution[i,ind] = this.state.pages[i];
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

    return (

      <LineChart width={500} height={300} data="">
        <XAxis dataKey="name"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    

    );
  }
}

const mapStateToProps = (state) => {
  console.log("State:"+state.stats);
  return {
    pages: state.pages,
    stats: state.stats,
  };
};

export default connect(mapStateToProps, {
  retrieveStatsByProject,
  retrievePagesByProject,
})(StatsList);