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


const CustomTooltip = ({ active, payload, label }) => {

  console.log(payload); 

  if (active && payload && payload.length && payload[0,2,2].length > 0) {
    console.log(payload[0,2,2].value.toString());
    return (
      <div className="custom-tooltip">
        <p className="players">Playerz:{`${payload[0,2,0].value}`}</p>
        <p className="weight">Weight:{`${payload[0,2,3].value}`}</p>
        <p className="url">URL:{`${payload[0,2,2].value}`}</p>
      </div>
    );
  }

  if (active && payload && payload.length && typeof payload[0,2,0] != 'undefined') {
    console.log(payload[0,2,0].value.toString());
    return (
      <div className="custom-tooltip">
        <p className="players">Players:{`${payload[0,2,0].value}`}</p>
      </div>
    );
  }

  return null;
};

  
class StatsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveStatsByProject = this.retrieveStatsByProject.bind(this);
    this.retrievePagesByProject = this.retrievePagesByProject.bind(this);
    this.updateStatistics = this.updateStatistics.bind(this);
    this.getData = this.getData.bind(this);

    this.state = {
      pages: null,
      stats: null,
      chartData: null,
      isLoading: true,
    };
  }

  componentDidMount(){
    console.log("Did mount");
    this.retrieveStatsByProject();
  }

  retrieveStatsByProject(){
    console.log("Grabbing Stats...");
    this.props.retrievePagesByProject(this.props.project_id).then(
      res => this.props.retrieveStatsByProject(this.props.project_id).then(
        res => this.getData()
      )
    ); 
  }


  retrievePagesByProject(){
    console.log("Grabbing Pages...");
    this.props.retrievePagesByProject(this.props.project_id)
  }



  getData() {
    if(this.state.chartData == null){
      console.log("Getting data...");
      this.updateStatistics();
    }
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


  updateStatistics() {
    const moment = require('moment')

    var st = this.props.stats;
    var pa = this.props.pages;

    if (typeof st !== 'undefined' && typeof pa !== 'undefined' && st !== null && pa !== null && st.length > 0 ){
      console.log("Stats and pages are defined");
      var usedPages = [];
      let chartData = {...this.state.chartData};
      chartData = [];


      for (let x = 0; x < st.length; x++) {

        var wt = null;
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


        var ts = moment(stat.timestamp.toString(),"YYYY-MM-DDTHH:mm");
        chartData.push({timestamp: moment.utc(ts).format("MM-DD HH:mm"), player_count: stat.player_count, weight: wt, url: ur});

        
      }

      this.setState({
        chartData: chartData,
        isLoading: false,
      });
      //console.log(this.chartData);
    }else{
      console.log("Stat or page are null");
    }

  }

  render() {
    const { isLoading,chartData } = this.state;

    //console.log("STATS:"+stats);
    //console.log("PAGES:"+pages);

    console.log(chartData);

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
          <YAxis dataKey="player_count" yAxisId={1} orientation="left" label={{ value: 'Players', angle: -90 }}/>
          <YAxis dataKey="weight" yAxisId={2} orientation="right" label={{ value: 'Post Popularity', angle: -90 }}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId={1} type="monotone"  dataKey="player_count" stroke="#ff7300" />
          <Scatter yAxisId={2} dataKey="weight" fill="red" />
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