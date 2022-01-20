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

  


  updateStatistics() {

    chartData = [];

    if(this.props.stats != null){
      for (let x = 0; x < this.props.stats.length; x++) {
        
      
      }
    }

    const data = [
      {
        name: 'Page A', uv: 590, pv: 800, amt: 1400,
      },
      {
        name: 'Page B', uv: 868, pv: 967, amt: 1506,
      },
      {
        name: 'Page C', uv: 1397, pv: 1098, amt: 989,
      },
      {
        name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
      },
      {
        name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
      },
      {
        name: 'Page F', uv: 1400, pv: 680, amt: 1700,
      },
    ];


    =

  }

  



  render() {
    const { stats,pages } = this.props;
    console.log("STATS:"+stats);
    console.log("PAGES:"+pages);
    //this.updateStatistics();

    return (

      <>
        <h2 className="text-heading">
            Trend Data
        </h2>
        <ComposedChart
          width={1200}
          height={400}
          data={stats}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="timestamp" />
          <YAxis dataKey="player_count"/>
          <Tooltip />
          <Legend />
          <Line type="monotone" data={stats} dataKey="player_count" stroke="#ff7300" />
        </ComposedChart>

        <ComposedChart
          width={1200}
          height={400}
          data={pages}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis dataKey="weight"/>
          <Tooltip />
          <Legend />
          <Scatter data={pages} dataKey="weight" fill="red" />
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