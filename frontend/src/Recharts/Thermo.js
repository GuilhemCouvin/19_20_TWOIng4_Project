import React, {Component} from 'react'
import { render } from 'react-dom'
import axios from 'axios';
import Thermometer from 'react-thermometer-component'
 

const Temperature = props => (
    <Thermometer 
                        theme="dark"
                        value={props.measure}
                        max="30"
                        steps="3"
                        format="°C"
                        size="big"
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
          id: props.id,
          currentMeasure: []
        }
      }
    
      componentDidMount(){
        
        axios.get('http://localhost:3000/sensors/')
        .then(response => {
          this.setState({sensors:response.data});
          console.log(this.state.sensors[14].userID);
          console.log('id:',this.state.id);

          const array =this.state.user_sensors;
          Array.prototype.forEach.call(this.state.sensors,element => {
            if(element.userID == this.state.id){
              array.push(element);
            }
          });
          this.setState({
            user_sensors:array
          });
          console.log('u:',this.state.user_sensors);
    
        })
          .catch(function(error){
            console.log(error);
          });
    
        axios.get('http://localhost:3000/measures/')
        .then(response => {
          this.setState({measures:response.data});
          console.log('yo:',this.state.measures);

          const array =this.state.user_measures;
          Array.prototype.forEach.call(this.state.user_sensors,sensor => {
            Array.prototype.forEach.call(this.state.measures,measure => {
              if(sensor._id == measure.sensorID){
                array.push(measure);
              }
            });
          });
          this.setState({
            user_measures:array
          });
          const array_temp = this.state.measures;
          var i = 0;
          var temp = 0;
          Array.prototype.forEach.call(this.state.user_measures,measure => {
            if(measure.type==='temperature'){
              array_temp.push(measure);
              i++;
              temp = temp + measure.value;
            }
          })
          this.setState({
            moy:temp/i 
          })
          console.log('moy:',this.state.moy);
        })
          .catch(function(error){
            console.log(error);
          });
    
          
      }
    
      componentWillReceiveProps(nextProps) {
          this.setState({id: this.props.id});
      }
    
      measuresList(){
        return <Temperature measure={this.state.moy} />
      }
    render(){
        return(
            <div>
                <h4>Moyenne (en °C)</h4>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {this.measuresList()}
                </div>
            </div>
        );
    }
}