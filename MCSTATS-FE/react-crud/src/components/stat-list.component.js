import React, { Component } from "react";
import { connect } from "react-redux";
import ComposedChart from '@bit/recharts.recharts.composed-chart';
import {
  retrieveStatsByProject,
} from "../actions/stats";
import {
  retrievePagesByProject,
} from "../actions/pages";
import { Link } from "react-router-dom";
import Line from '@bit/recharts.recharts.line';
import XAxis from '@bit/recharts.recharts.x-axis';
import YAxis from '@bit/recharts.recharts.y-axis';
import CartesianGrid from '@bit/recharts.recharts.cartesian-grid';
import Tooltip from '@bit/recharts.recharts.tooltip';
import Legend from '@bit/recharts.recharts.legend';
import Scatter from '@bit/recharts.recharts.scatter';

class StatsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.retrieveStatsByProject = this.retrieveStatsByProject.bind(this);
    this.retrievePagesByProject = this.retrievePagesByProject.bind(this);

    this.state = {
      pages: null,
      stats: null,
      chartData: null,
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

  getNearestPage(timestamp, usedPages){

    nearestInd = 0;
    nearest = this.props.pages[nearestInd].timestamp;
    nearestPage = null;

    for (let x=0;x<this.props.pages.length;x++){
      
      var ms = moment(timestamp,"DD/MM/YYYY HH:mm:ss").diff(moment(this.props.pages[x].timestamp,"DD/MM/YYYY HH:mm:ss"));
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

      if (s < nearest && usedPages.includes(this.props.pages[x]) == false){
        nearestPage = this.props.pages[x];
        nearest = s;
      }
    }

    return nearestPage;

  }


  updateStatistics() {

    chartData = [];
    usedPages = [];

    if(this.props.stats != null){
      for (let x = 0; x < this.props.stats.length; x++) {

        stat = this.props.stats[x];
        page = this.getNearestPage(stat.timestamp,usedPages);
        usedPages.append(page);

        const chartEntry = [
          {timestamp: stat.timestamp, player_count: stat.player_count, weight: page.weight, url: page.url}
        ];

        chartData.append(chartEntry);
      
      }
    }

    return chartData;

  }

  



  render() {
    const { stats,pages } = this.props;
    const { chartData } = this.updateStatistics();

    console.log("STATS:"+stats);
    console.log("PAGES:"+pages);

    return (

      <>
        <h2 className="text-heading">
            Trend Data
        </h2>
        <ComposedChart
          width={1200}
          height={400}
          data={chartData}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="player_count"/>
          <Tooltip />
          <Legend />
          <Line type="monotone"  dataKey="player_count" stroke="#ff7300" />
          <Scatter dataKey="weight" fill="red" />
        </ComposedChart>


        {/* <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={stats} margin={{ right: 300 }}>
            <CartesianGrid />
            <XAxis dataKey="timestamp" 
                interval={'preserveStartEnd'} />
            <YAxis dataKey="player_count" 
                interval={'preserveStartEnd'}></YAxis>
            <Legend />
            <Tooltip />
            <Line dataKey="player_count"
                stroke="red" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer> */}
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