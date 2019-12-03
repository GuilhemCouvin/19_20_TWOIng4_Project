import React, { Component } from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap';
import './App.css';

import Dash from './Dashboard';
import Additem from './Additem';

import "react-circular-progressbar/dist/styles.css";


class App extends Component {

  state = {
    bulletin: [
    {name: '07/11', maths: 15, physics: 13}, 
    {name: '14/11', maths: 17, physics: 15},
    {name: '21/11', maths: 8, physics: 13},
    {name: '28/11', maths: 11, physics: 11},
    {name: '05/12', maths: 13, physics: 16},
  ],
  moyenne: {
    maths:10, 
    physics:10
  },
  Dashboard: true,
  Additem: false
};

  handleClickDash = () => {
    this.setState({
      Dashboard:true,
      Additem:false
    });
  }

  handleClickAdditem = () => {
    this.setState({
      Dashboard:false,
      Additem:true
    });
  }

  render(){

    return (
      <div>
        <Container>
          <Row className="nav">
              <Button onClick={(e) => this.handleClickDash()} className="button" variant="light">Dashboard </Button>
              <Button onClick={(e) => this.handleClickAdditem()} variant="light">Add Data</Button>
          </Row>

          { this.state.Dashboard && <Dash data={this.state}/> }
          { this.state.Additem && <Additem /> }

        </Container>
      </div>
    );
  }
}

export default App;
