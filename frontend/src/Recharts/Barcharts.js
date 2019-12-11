import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import axios from 'axios';

export default class Chart extends Component {
  constructor(props){
    super(props);
    this.state ={
      measures: [],
      user_measures:[],
      sensors: [],
      user_sensors:[],
      humidities:[],
      id: props.id,
      list:[]
    }
  }

  componentDidMount(){
    
    axios.get('http://localhost:3000/sensors/')
    .then(response => {
      this.setState({sensors:response.data});
      console.log(this.state.sensors);

      const array =this.state.user_sensors;
      Array.prototype.forEach.call(this.state.sensors,element => {
        if(element.userID == this.state.id){
          array.push(element);
        }
      });
      this.setState({
        user_sensors:array
      });
      console.log('user sensors',this.state.user_sensors);

    })
      .catch(function(error){
        console.log(error);
      });

    axios.get('http://localhost:3000/measures/')
    .then(response => {
      this.setState({measures:response.data});
      console.log('m:',this.state.measures)
      const array =this.state.user_measures;
      Array.prototype.forEach.call(this.state.user_sensors,sensor => {
        Array.prototype.forEach.call(this.state.measures,measure => {
          if(sensor.sensorID === measure.sensorID){
            array.push(measure);
          }
        });
      });
      this.setState({
        user_measures:array
      });
      console.log('user_m:',this.state.user_measures);
      const array_hum =this.state.humidities;
      Array.prototype.forEach.call(this.state.user_measures,element => {
        if(element.type === 'humidity'){
            array_hum.push(element);
        }
      });
      this.setState({
        humidities:array_hum
      });
      console.log('hum: ',this.state.humidities);
      const list = [];
    Array.prototype.forEach.call(this.state.humidities,element =>{
        list.push({
            creationDate:element.creationDate,
            value:element.value
        })
    })
    this.setState({
        list:list
    })
    console.log('list:',this.state.list);
    })
    .catch(function(error){
        console.log(error);
    });   
    
}

  componentWillReceiveProps(nextProps) {
      this.setState({id: this.props.id});
  }

  render() {
    const { list } = this.state;
    return (
      <BarChart
        width={600}
        height={300}
        data={list}
        margin={{ top: 5, right: 20, left: 5, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="creationDate" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    );
  }
}
