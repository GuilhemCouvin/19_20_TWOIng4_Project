import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Button, NavbarItem } from 'react-bootstrap';
import './App.css';

import Dashboard from './pages/Dashboard';
import Additem from './pages/Additem';

import "react-circular-progressbar/dist/styles.css";


class App extends Component {

  

  state = {
    user:[
      {userID:'0', country:'France', personsInHouse:'4', houseSize:'medium'},
      {userID:'1', country:'France', personsInHouse:'6', houseSize:'big'},
      {userID:'2', country:'Espagne', personsInHouse:'2', houseSize:'small'}
    ],
    sensor:[
      {sensorID:'0', creationDate:'2014-01-01T23:28:56.782Z', userID:'0', location:'kitchen'},
      {sensorID:'1', creationDate:'2015-01-01T23:28:56.782Z', userID:'0', location:'bedroom'},
      {sensorID:'2', creationDate:'2016-01-01T23:28:56.782Z', userID:'0', location:'bathroom'},

      {sensorID:'3', creationDate:'2014-01-01T23:28:56.782Z', userID:'1', location:'kitchen'},
      {sensorID:'4', creationDate:'2015-01-01T23:28:56.782Z', userID:'1', location:'bedroom'},
      {sensorID:'5', creationDate:'2016-01-01T23:28:56.782Z', userID:'1', location:'bathroom'},

      {sensorID:'6', creationDate:'2014-01-01T23:28:56.782Z', userID:'2', location:'kitchen'},
      {sensorID:'7', creationDate:'2015-01-01T23:28:56.782Z', userID:'2', location:'bedroom'},
      {sensorID:'8', creationDate:'2016-01-01T23:28:56.782Z', userID:'2', location:'bathroom'},
    ],
    measure:[
      {measureID:'0', type:'humidity', creationDate:'2016-01-01T23:28:56.782Z', value:'70', sensorID:'2'},
      {measureID:'1', type:'airPollution', creationDate:'2015-01-01T23:28:56.782Z', value:'4', sensorID:'1'},
      {measureID:'2', type:'temperature', creationDate:'2014-01-01T23:28:56.782Z', value:'7', sensorID:'0'},

      {measureID:'3', type:'humidity', creationDate:'2016-01-01T23:28:56.782Z', value:'80', sensorID:'5'},
      {measureID:'4', type:'airPollution', creationDate:'2015-01-01T23:28:56.782Z', value:'3', sensorID:'4'},
      {measureID:'5', type:'temperature', creationDate:'2014-01-01T23:28:56.782Z', value:'9', sensorID:'3'},

      {measureID:'6', type:'humidity', creationDate:'2016-01-01T23:28:56.782Z', value:'90', sensorID:'8'},
      {measureID:'7', type:'airPollution', creationDate:'2015-01-01T23:28:56.782Z', value:'2', sensorID:'7'},
      {measureID:'8', type:'temperature', creationDate:'2014-01-01T23:28:56.782Z', value:'11', sensorID:'6'},


      {measureID:'9', type:'humidity', creationDate:'2017-01-01T23:28:56.782Z', value:'75', sensorID:'2'},
      {measureID:'10', type:'airPollution', creationDate:'2016-01-01T23:28:56.782Z', value:'5', sensorID:'1'},
      {measureID:'11', type:'temperature', creationDate:'2015-01-01T23:28:56.782Z', value:'13', sensorID:'0'},

      {measureID:'12', type:'humidity', creationDate:'2017-01-01T23:28:56.782Z', value:'85', sensorID:'5'},
      {measureID:'13', type:'airPollution', creationDate:'2016-01-01T23:28:56.782Z', value:'4', sensorID:'4'},
      {measureID:'14', type:'temperature', creationDate:'2015-01-01T23:28:56.782Z', value:'15', sensorID:'3'},

      {measureID:'15', type:'humidity', creationDate:'2017-01-01T23:28:56.782Z', value:'95', sensorID:'8'},
      {measureID:'16', type:'airPollution', creationDate:'2016-01-01T23:28:56.782Z', value:'3', sensorID:'7'},
      {measureID:'17', type:'temperature', creationDate:'2015-01-01T23:28:56.782Z', value:'17', sensorID:'6'}
    ]
  }


  handleClickDash = () => {
    this.setState({
      dashboard:true,
      additem:false
    });
  }

  handleClickAdditem = () => {
    this.setState({
      dashboard:false,
      additem:true
    });
  }

  render(){

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/' className="navbar-brand">Dashboard</Link>
            <Link to='/admin' className="navbar-brand">Admin</Link>
          </nav>
          <Container>
            <Route path='/' exact component={Dashboard} />
            <Route path='/admin'  component={Additem} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
