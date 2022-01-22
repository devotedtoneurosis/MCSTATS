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

  
class StatsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveStatsByProject = this.retrieveStatsByProject.bind(this);
    this.retrievePagesByProject = this.retrievePagesByProject.bind(this);

    this.state = {
      pages: null,
      stats: null,
      chartData: [],
      isLoading: true,
    };
  }

  componentDidMount(){
    retrievePagesByProject();
    retrieveStatsByProject();
  }

  retrievePagesByProject(){
    console.log("Grabbing Pages...");
    this.props.retrievePagesByProject(this.props.project_id).then(
      res => this.getData
    ); 
  }

  retrieveStatsByProject(){
    console.log("Grabbing Stats...");
    this.props.retrievePagesByProject(this.props.project_id).then(
      res => this.getData
    ); 
  }

  getData() {
    console.log("Getting data...");
    this.updateStatistics(this.state.stats,this.state.pages);
    this.state = {
      isLoading: false,
    };
  }

  getNearestPage(timestamp, pa, usedPages){

    const moment = require('moment')

    var nearest = -1;
    var nearestPage = null;

    for (let x=0;x<pa.length;x++){
      
      //console.log(pa[x]);

      //console.log(timestamp.toString());
      //console.log(pa[x].date);

      var m = moment(timestamp.toString(),"YYYY-MM-DDTHH:mm");
      var m2 = moment(pa[x].date,"YYYY-MM-DDTHH:mm");
      var ms = m.diff(m2);
      var d = moment.duration(ms);
      var s = (Math.floor(d.asHours())*60) + Number(moment.utc(ms).format("mm"));

      //console.log("Timedif:"+s);
      if(nearest == -1){nearest = s+1;}
      //console.log("Nearest:"+nearest.toString());

      //console.log("Already used:"+usedPages.includes(pa[x]).toString());

      if (s < nearest && usedPages.includes(pa[x]) == false){
        //console.log("Found nearest");
        //console.log(pa[x]);
        usedPages.push(pa[x]);
        nearestPage = pa[x];
        nearest = s;
      }
    }

    return nearestPage;

  }


  updateStatistics(st,pa) {

    var chartData = null;

    if (typeof st !== 'undefined' && typeof pa !== 'undefined' && st !== null && pa !== null && st.length > 0 ){
      console.log("Stats and pages are defined");
      var usedPages = [];
      this.chartData = new Array(st.length);


      for (let x = 0; x < st.length; x++) {

        var wt = 0;
        var ur = "";

        var stat = st[x];
        if(typeof pa != 'undefined' && pa != null && pa.length > 0){
          //console.log(pa);
          var page = this.getNearestPage(stat.timestamp,pa,usedPages);
          if(page != null){
            usedPages.push(page[0]);
            console.log(page[0]);
            wt = page.weight;
            ur = page.url;
          }
        }

        this.chartData.push({timestamp: stat.timestamp, player_count: stat.player_count, weight: wt, url: ur});

        this.setState({
          chartData: chartData,
        });
        
      }
      //console.log(this.chartData);
    }else{
      console.log("Stat or page are null");
    }

  }


  render() {
    const { chartData } = this.props;

    //console.log("STATS:"+stats);
    //console.log("PAGES:"+pages);

    console.log(chartData);

    return (

      <>
        <h2 className="text-heading">
            Trend Data
        </h2>

        <button
            className="m-3 btn btn-sm btn-danger"
            //onClick={this.updateStatistics(stats,pages)}
          > 

            Get Stats
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