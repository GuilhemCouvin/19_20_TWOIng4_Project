import React, { Component, PureComponent } from 'react';
import './Circlecharts.css';
import {
  PieChart, Pie, Sector, Cell,ResponsiveContainer,LabelList
} from 'recharts';
import axios from 'axios';

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];




export default class Example extends PureComponent {
  
  constructor(props){ 
    super(props);
    this.state ={
      measures: [],
      user_measures:[],
      sensors: [],
      user_sensors:[],
      id: props.id,
      final:[],
      data01:[],
      data02:[],
      measure_air:0,
      measure_hum:0,
      measure_temps:0,

      sensor_bedroom:0,
      sensor_bathroom:0,
      sensor_entrance:0,
      sensor_livingroom:0
    }
  }

  componentDidMount(){
    
    axios.get('http://localhost:3000/sensors/')
    .then(response => {
      this.setState({sensors:response.data});
      const array=[];
      var sensor_bedroom = 0;
      var sensor_bathroom = 0;
      var sensor_entrance = 0;
      var sensor_livingroom = 0;
      Array.prototype.forEach.call(this.state.sensors,element => {
        if(element.userID === this.state.id){
          array.push(element);
          if(element.location === 'bedroom'){
            sensor_bedroom++;
          }else if(element.location === 'bathroom'){
            sensor_bathroom++;
          }else if(element.location === 'entrance'){
            sensor_entrance++;
          }else if(element.location === 'livingroom'){
            sensor_livingroom++;
          }
        }
      });
      this.setState({
        user_sensors:array,
        data01:[
          {name:"bedroom", value:sensor_bedroom},
          {name:"bathroom", value:sensor_bathroom},
          {name:"entrance", value:sensor_entrance},
          {name:"livingroom", value:sensor_livingroom}
        ],
        sensor_bedroom: sensor_bedroom,
        sensor_bathroom: sensor_bathroom,
        sensor_entrance: sensor_entrance,
        sensor_livingroom: sensor_livingroom
      });
      console.log('a ',sensor_bedroom,' h ',sensor_bathroom,' t ',sensor_entrance);

    })
      .catch(function(error){
        console.log(error);
      });

      
    axios.get('http://localhost:3000/measures/')
    .then(response => {
      this.setState({measures:response.data});
      var measure_air = 0;
      var measure_hum = 0;
      var measure_temp = 0;
      const array =this.state.user_measures;
      Array.prototype.forEach.call(this.state.user_sensors,sensor => {
        Array.prototype.forEach.call(this.state.measures,measure => {
          if(sensor._id === measure.sensorID){
            if(measure.type === 'airPollution'){
              measure_air++;
            }else if(measure.type === 'humidity'){
              measure_hum++;
            }else if(measure.type === 'temperature'){
              measure_temp++;
            }
          }
        });
      });

        console.log('a ',measure_air,' h ',measure_hum,' t ',measure_temp);
        this.setState({
          data02:[
            {name:"airPollution", value:measure_air},
            {name:"humidity", value:measure_hum},
            {name:"temperature", value:measure_temp}
          ],
          measure_air: measure_air,
          measure_hum: measure_hum,
          measure_temp: measure_temp
        });
      }).catch(function(error){
        console.log(error);
      });

      
  }


  render() {
    return (
      <div>
      <h4>Repartition des mesures</h4>
        <PieChart width={200} height={200}>
          {/* <Pie data={this.state.data01} dataKey="value" outerRadius={30} fill="#8884d8"  label/> */}

          <Pie data={this.state.data02} dataKey="value" innerRadius={5} outerRadius={40} fill="#82ca9d" label />
        </PieChart>
        {/* <p>Capteur Chambre: <strong>{this.state.sensor_bedroom}</strong></p>
        <p>Capteur SdB: <strong>{this.state.sensor_bathroom}</strong></p>
        <p>Capteur Entrée: <strong>{this.state.sensor_entrance}</strong></p>
        <p>Capteur Salon: <strong>{this.state.sensor_livingroom}</strong></p> */}
        <p>Nbr de mesures de l'air: <strong>{this.state.measure_air}</strong></p>
        <p>Nbr de mesures de la température: <strong>{this.state.measure_temp}</strong></p>
        <p>Nbr de mesures de l'humidité: <strong>{this.state.measure_hum}</strong></p>
      </div>
    );
  }
}
