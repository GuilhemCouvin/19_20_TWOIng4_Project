import React, {Component} from 'react';
import { Table } from 'reactstrap';
import './TableMeasures.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Measure = props => (
  <tr>
    <td>{props.measure.type}</td>
    <td>{props.measure.creationDate}</td>
    <td>{props.measure.value}</td>
    <td>{props.measure.sensorID}</td>
    <td>
      <Link to={"/edit/"+props.measure._id}>Edit</Link>
    </td>
  </tr>
)

class Tablechart extends Component{
  
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
      if(currentMeasure.type==='airPollution'){
        return <Measure measure={currentMeasure} key={i} />
      }
    })
  }



    render(){
        return (
          <div>
          <h3 style={{textAlign: 'center',marginTop:26}}>Indices de pollution relevés</h3>
            <Table dark>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Indices</th>
                  <th>ID Capteur</th>
                  <th>Actions</th>
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

export default Tablechart;