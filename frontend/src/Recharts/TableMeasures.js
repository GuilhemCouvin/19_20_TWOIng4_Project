import React, {Component} from 'react';
import { Table } from 'reactstrap';

import { link } from 'react-router-dom';
import axios from 'axios';

const Measure = props => (
  <tr>
    <td>{props.measure.measureID}</td>
    <td>{props.measure.type}</td>
    <td>{props.measure.creationDate}</td>
    <td>{props.measure.value}</td>
    <td>{props.measure.sensorID}</td>
  </tr>
)

class Tablechart extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      measures: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/measures/')
      .then(response => {
        this.setState({measures:response.data});
      })
        .catch(function(error){
          console.log(error);
        })
  }

  measuresList(){
    return this.state.measures.map(function(currentMeasure,i){
      if(currentMeasure.type==='airPollution'){
        return <Measure measure={currentMeasure} key={i} />
      }
    })
  }


  

    render(){
        return (
          <div>
          <h3 style={{textAlign: 'center',marginTop:26}}>Indices de pollution de l'air relevés   </h3>
            <Table dark>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>type</th>
                  <th>Date</th>
                  <th>Valeur</th>
                  <th>Id du Capteur</th>
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