import React, {Component} from 'react';
import { Table } from 'reactstrap';
import './TableMeasures.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ResponsiveContainer} from 'recharts';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Barchart = props => (
  <ResponsiveContainer aspect="2">
  <BarChart
        data={props.measure}
        margin={{ top: 5, right: 20, left: 5, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="creationDate" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
)

class Tablechart extends Component{
  
  constructor(props){ 
    super(props);
    this.state ={
      measures: [],
      user_measures:[],
      sensors: [],
      user_sensors:[],
      id: props.id,
      final:[]
    }
  }

  componentDidMount(){
    
    axios.get('http://localhost:3000/sensors/')
    .then(response => {
      this.setState({sensors:response.data});

      const array =this.state.user_sensors;
      Array.prototype.forEach.call(this.state.sensors,element => {
        if(element.userID == this.state.id){
          array.push(element);
        }
      });
      this.setState({
        user_sensors:array
      });
      console.log(this.state.user_sensors);

    })
      .catch(function(error){
        console.log(error);
      });

    axios.get('http://localhost:3000/measures/')
    .then(response => {
      this.setState({measures:response.data});

      const array =this.state.user_measures;
      Array.prototype.forEach.call(this.state.user_sensors,sensor => {
        Array.prototype.forEach.call(this.state.measures,measure => {
          if(sensor._id === measure.sensorID){
            array.push(measure);
          }
        });
      });
      console.log(array);
      this.setState({
        user_measures:array
      });
      const array_new=[];
      Array.prototype.forEach.call(this.state.user_measures,measure=>{
        if(measure.type==='airPollution'){
          array_new.push(measure);
        }
      });
      console.log('lele',array_new);
      this.setState({
        final:array_new
      })
    })
      .catch(function(error){
        console.log(error);
      });

      
  }

  componentWillReceiveProps(nextProps) {
      this.setState({id: this.props.id});
  }

  measuresList(){
    return <Barchart measure={this.state.final} /> 
  }



    render(){
        return (
          <div>
          <h3 style={{textAlign: 'center',marginTop:26}}>Indices de pollution relevés</h3>
          {this.measuresList()}
            </div>
          );
    }
  
}

export default Tablechart;