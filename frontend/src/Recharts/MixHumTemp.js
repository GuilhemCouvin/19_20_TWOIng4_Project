import React, { Component } from 'react';
import './Recharts.css';
import { 
  ResponsiveContainer,
    ComposedChart, 
    Line, 
    Bar,
    Area,
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip 
} from 'recharts';
import axios from 'axios';

export default class Mix extends Component {
    constructor(props){
        super(props);
        this.state ={
          measures: [],
          user_measures:[],
          sensors: [],
          user_sensors:[],
          temperatures:[],
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
    
          const array =this.state.user_measures;
          Array.prototype.forEach.call(this.state.user_sensors,sensor => {
            Array.prototype.forEach.call(this.state.measures,measure => {
              if(sensor._id === measure.sensorID){
                array.push(measure);
              }
            });
          });
          this.setState({
            user_measures:array
          });
          const array_temp =[];
          const array_hum =[];
          Array.prototype.forEach.call(this.state.user_measures,element => {
            if(element.type === 'airPollution'){
                array_temp.push(element);
            } else if(element.type === 'humidity'){
                array_hum.push(element);
            }
          });
          this.setState({
            temperatures:array_temp
          });
            console.log('temp: ',this.state.temperatures);
          const list = [];
          Array.prototype.forEach.call(array_hum,element => {
              list.push({
                  creationDate:element.creationDate,
                  hum:element.value
              })
          })
        
        Array.prototype.forEach.call(this.state.temperatures,element =>{
            list.push({
                creationDate:element.creationDate,
                temp:element.value
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
          console.log('charts: ',this.state.temperatures)
        return (
            <div className="container">
                <h3>Analyse: Humidité et Pollution de l'air</h3>
                <ResponsiveContainer aspect="2">
                    <ComposedChart data={this.state.list} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                        <Area type="monotone" dataKey="temp" stroke="#8884d8" />
                        <Bar dataKey="hum" barSize={20} fill="#413ea0" />
                        <CartesianGrid stroke="white" strokeDasharray="5 5" />
                        <XAxis dataKey="creationDate" />
                        <YAxis />
                        <Tooltip />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
