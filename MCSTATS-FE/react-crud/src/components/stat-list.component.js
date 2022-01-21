import React, { Component } from "react";
import { connect } from "react-redux";
import ComposedChart from '@bit/recharts.recharts.composed-chart';
import {
  retrieveStatsByProject,
} from "../actions/stats";
import {
  retrievePagesByProject,
} from "../actions/pages";
import Line from '@bit/recharts.recharts.line';
import XAxis from '@bit/recharts.recharts.x-axis';
import YAxis from '@bit/recharts.recharts.y-axis';
import CartesianGrid from '@bit/recharts.recharts.cartesian-grid';
import Tooltip from '@bit/recharts.recharts.tooltip';
import Legend from '@bit/recharts.recharts.legend';
import Scatter from '@bit/recharts.recharts.scatter';
import moment from 'react-moment';


var chartData = [];
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
  }

  retrievePagesByProject() {
    this.props.retrievePagesByProject(this.props.project_id);
  }

  refreshData() {
    
  }

  getNearestPage(timestamp, pa, usedPages){

    var nearestInd = 0;
    var nearest = pa[nearestInd].timestamp;
    var nearestPage = null;

    for (let x=0;x<pa.length;x++){
      
      console.log(pa[x]);

      var m = moment(timestamp.toString(),"DD/MM/YYYY HH:mm:ss");
      var m2 = moment(pa[x].timestamp,"DD/MM/YYYY HH:mm:ss");
      var ms = m.diff(m2);
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

      if (s < nearest && usedPages.includes(pa[x]) == false){
        nearestPage = pa[x];
        nearest = s;
      }
    }

    return nearestPage;

  }


  updateStatistics(st,pa) {


    if (typeof st !== 'undefined' && typeof pa !== 'undefined' && st !== null && pa !== null && st.length > 0 ){
      console.log("Stats and pages are defined");
      var usedPages = [];
      this.chartData = new Array(st.length);


      for (let x = 0; x < st.length; x++) {

        var wt = 0;
        var ur = "";

        var stat = st[x];
        if(typeof pa[x] != 'undefined'){
          var page = this.getNearestPage(stat.timestamp,pa,usedPages);
          usedPages.append(page);
          wt = page.weight;
          ur = page.url;
        }

        const chartEntry = [
          {timestamp: stat.timestamp, player_count: stat.player_count, weight: wt, url: ur}
        ];

        console.log(chartEntry);
        this.chartData.push(chartEntry);
      
      }
      console.log(this.chartData);
    }else{
      console.log("Stat or page are null");
    }
  }

  



  render() {
    const { stats,pages,chartData } = this.props;

    //console.log("STATS:"+stats);
    //console.log("PAGES:"+pages);

    return (

      <>
        <h2 className="text-heading">
            Trend Data
        </h2>

        <button
            className="m-3 btn "
            onClick={this.updateStatistics(stats,pages)}
          >
            Update
          </button>

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