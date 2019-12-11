import React, { Component } from 'react';
import {Container,Row,Col,Button,FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Recharts/Profile.css';

import Form from 'react-bootstrap/Form'
import axios from 'axios';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
        id:props.id,
        userID:'',
      country:'',
      personsInHouse:'',
      houseSize:'' 
      }
  }

  componentDidMount(){
    console.log(this.state.id);
      axios.get('http://localhost:3000/users/'+this.state.id)
      .then(response => {
        console.log(response.data);
          this.setState({
            userID:response.data._id,
            country:response.data.country,
            personsInHouse:response.data.personsInHouse,
            houseSize:response.data.houseSize,
          })
          console.log('State: '+this.state.creationDate);
      })
      .catch(function(error){
          console.log(error);
      });
  }

  render(){
    return (
      <div style={{marginTop:10,marginBottom:10}}>
        <Container>
        <Row>
            <Col 
            className="form" 
            style={{color: 'white'}}
            >
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label><strong>User ID:</strong> </Form.Label><br/>
                        <Form.Label>{this.state.id}</Form.Label>
                        
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label><strong>country:</strong> </Form.Label><br/>
                        <Form.Label>{this.state.country}</Form.Label>
                    </Form.Group>     
                </Form>
                
            </Col>
        </Row>
        </Container>
      </div>
    );
  }
}
