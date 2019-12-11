import React, {Component} from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import Thermometer from 'react-thermometer-component'
 

const Temperature = props => (
    <Thermometer 
                        theme="dark"
                        value={props.measure.value}
                        max="30"
                        steps="3"
                        format="°C"
                        size="normal"
                        height="200"
                    />
  )

export default class Thermo extends Component{
    constructor(props){
        super(props);
        this.state ={
          measures: [],
          user_measures:[],
          sensors: [],
          user_sensors:[],
          id: props.id
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
              if(sensor.sensorID === measure.sensorID){
                array.push(measure);
              }
            });
          });
          console.log(array);
          this.setState({
            user_measures:array
          });
    
        })
          .catch(function(error){
            console.log(error);
          });
    
          
      }
    
      componentWillReceiveProps(nextProps) {
          this.setState({id: this.props.id});
      }
    
      measuresList(){
        return this.state.user_measures.map(function(currentMeasure,i){
          if(currentMeasure.type==='temperature' && currentMeasure.creationDate=='2016-01-01T23:28:56.782Z'){
            return <Temperature measure={currentMeasure} key={i} />
          }
        })
      }
    render(){
        return(
            <div>
                <h3>Température</h3>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {this.measuresList()}
                </div>
            </div>
        );
    }
}