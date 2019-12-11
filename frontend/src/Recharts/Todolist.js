import React, {Component} from 'react';
import { Table } from 'reactstrap';
import './TableMeasures.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Sensor = props => (
  <tr>
    <td>{props.measure.location}</td>
    <td>
      <Link to={"/edit/"+props.measure._id}>Edit</Link>
    </td>
  </tr>
)

export default class Sensors extends Component{
  
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
    return this.state.user_sensors.map(function(currentSensor,i){
        return <Sensor measure={currentSensor} key={i} />
      
    })
  }



    render(){
        return (
          <div>
          <h3 style={{textAlign: 'center',marginTop:26}}>Capteurs</h3>
            <Table dark>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {this.measuresList()}
              </tbody>
            </Table>
            </div>
          );
    }
  
}