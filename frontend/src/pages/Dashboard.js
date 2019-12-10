import React, { Component } from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap';
import './Dashboard.css';

import Widget from './../Recharts/Recharts';
import Chart from './../Recharts/Barcharts';
import Circle from './../Recharts/Circlecharts';
import TodoApp from './../Recharts/Todolist';
import Bar from './../Recharts/ProgressBar';
import Tablechart from './../Recharts/Table';

import "react-circular-progressbar/dist/styles.css";


export default class Dashboard extends Component {

  state = {
    bulletin: [
      {date: '07/11', maths: 15, physics: 13}, 
      {date: '14/11', maths: 17, physics: 15},
      {date: '21/11', maths: 8, physics: 13},
      {date: '28/11', maths: 11, physics: 11},
      {date: '05/12', maths: 13, physics: 16},
    ],
    moyenne: {
      maths:10, 
      physics:10
    },
    dashboard: true,
    additem: false,
    abs: {name:'Absences', nb:13,lim:20},
    ret: {name:'Retards', nb:8,lim:15},
    todoItems: [
      {index: 1, value: "Interro Maths", done: false},
      {index: 2, value: "DM Physics", done: false},
      {index: 3, value: "Exercices Maths", done: false},
      {index: 4, value: "DS Physics", done: false},
    ]
  };

    constructor(props) {
        super(props);
        this.handleMoyenne = this.handleMoyenne.bind(this);
     }
      //state = this.props.data;

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
    //console.log(this.state.moyenne.maths);
    return (
      <div>
        <Container>
          <Row>
            <Col xs={12} md={3} className="widget">
              <Circle data={this.state.moyenne}/>
            </Col>
            <Col xs={12} md={8} className="widget">
              <Widget data={this.state.bulletin}/>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8} className="widget">
              <Bar data={this.state.abs}/>
              <Bar data={this.state.ret}/>
            </Col>
            <Col xs={12} md={3} className="widget">
              <Circle data={this.state.moyenne}/>
            </Col>
          </Row>

          <Row>
            <Col xs={3} className="widget">
              < TodoApp todoItems={this.state.todoItems}/>
            </Col>
            <Col xs={12} md={8} className="widget">
              <Tablechart data={this.state.bulletin}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

