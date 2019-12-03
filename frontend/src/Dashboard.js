import React, { Component } from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap';
import './Dashboard.css';

import Widget from './Recharts/Recharts';
import Chart from './Recharts/Barcharts';
import Circle from './Recharts/Circlecharts';

import "react-circular-progressbar/dist/styles.css";


class Dash extends Component {
    constructor(props) {
        super(props);
        this.handleMoyenne = this.handleMoyenne.bind(this);
     }
state = this.props.data;


  handleMoyenne(){

    console.log(this.state.bulletin.length);
    var somme_maths = 0;
    var somme_physics = 0;

    for(var i=0;i<this.state.bulletin.length;i++){
      somme_maths += this.state.bulletin[i].maths;
      somme_physics += this.state.bulletin[i].physics;
    }
    var resultat_maths = somme_maths / this.state.bulletin.length;
    var resultat_physics = somme_physics / this.state.bulletin.length;
    console.log(resultat_maths);
    console.log(resultat_physics);

    this.setState({
      moyenne:{maths:resultat_maths, physics:resultat_physics}
    });
    console.log(this.state);

  }

    componentDidMount() {
        setTimeout(() => {
        this.handleMoyenne();
        })
    }

  render(){
    console.log(this.state.moyenne.maths);
    
    return (
      <div>
        <Container>
          <Row>
                <Col xs={12} md={3} className="widget">
                    <Circle data={this.state.moyenne}/>
                </Col>
                <Col xs={12} md={8} className="widget">
                <   Widget data={this.state.bulletin}/>
                </Col>
          </Row>

          <Row>
                <Col xs={3} className="widget">
                    <h1>Widget 3</h1>
                </Col>
                <Row>
                    <Col xs={12} md={5} className="widget">
                        <Circle data={this.state.moyenne}/>
                    </Col>
                    <Col xs={12} md={6} className="widget">
                        <Circle data={this.state.moyenne}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={11} className="widget">
                        <h1>Widget 6</h1>
                        <Chart />
                    </Col>
                </Row>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Dash;
