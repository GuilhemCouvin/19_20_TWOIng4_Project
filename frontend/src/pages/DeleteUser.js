import React, { Component } from 'react';
import {Container,Row,Col,Button,FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DeleteUser.css';

import Form from 'react-bootstrap/Form'
import Axios from 'axios';


export default class DeleteUser extends Component {
  constructor(props){
    super(props);
    this.state={
        id:props.id,
        userID:'',
      country:'',
      personsInHouse:'',
      houseSize:'' 
      }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();

    Axios.post('http://localhost:3000/users/delete/'+this.props.match.params.id)
    .then(res => console.log(res.data));
    this.props.history.push('/admin/'+this.props.id);   
  }

  componentDidMount(){
      Axios.get('http://localhost:3000/users/'+this.props.match.params.id)
      .then(response => {
          this.setState({
            userID:response.data.userID,
            country:response.data.country,
            personsInHouse:response.data.personsInHouse,
            houseSize:response.data.houseSize,
          })
          console.log('State: '+this.state.creationDate);
      })
      .catch(function(error){
          console.log(error);
      })
  }

  render(){
    return (
      <div style={{marginTop:10,marginBottom:10}}>
        <Container>
        <Row>
            <Col 
            className="form" 
            style={{color: 'white'}}
            md={{ span: 6, offset: 3 }}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label><strong>User ID:</strong> </Form.Label><br/>
                        <Form.Label>{this.state.userID}</Form.Label>
                        
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label><strong>country:</strong> </Form.Label><br/>
                        <Form.Label>{this.state.country}</Form.Label>
                        
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label><strong>Taille du foyer:</strong> </Form.Label><br/>
                        <Form.Label>{this.state.personsInHouse} pers.</Form.Label>
                        
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label><strong>Taille de la maison:</strong> </Form.Label><br/>
                        <Form.Label>  {this.state.houseSize}</Form.Label>
                        
                    </Form.Group>    
                    <Button type="submit" value="Delete">Supprimer</Button> 
                </Form>
                
            </Col>
        </Row>
        </Container>
      </div>
    );
  }
}
