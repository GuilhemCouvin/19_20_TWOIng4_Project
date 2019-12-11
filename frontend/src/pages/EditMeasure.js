import React, { Component } from 'react';
import {Container,Row,Col,Button,FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Additem.css';

import Form from 'react-bootstrap/Form'
import Axios from 'axios';


class Additem extends Component {
  constructor(props){
    super(props);

    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.onChangeUserCountry = this.onChangeUserCountry.bind(this);
    this.onChangeUserPersonsInHouse = this.onChangeUserPersonsInHouse.bind(this);
    this.onChangeUserHouseSize = this.onChangeUserHouseSize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      measureID:'',
      type:'',
      creationDate:'',
      value:'',
      sensorID:''
    }
  }

  onChangeUserID(e){
    this.setState({
      userID: e.target.value
    });
  }

  onChangeUserCountry(e){
    this.setState({
      country: e.target.value
    });
  }

  onChangeUserPersonsInHouse(e){
    this.setState({
      personsInHouse: e.target.value
    });
  }

  onChangeUserHouseSize(e){
    this.setState({
      houseSize: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    console.log(`New User !`);
    console.log('UserID: '+this.state.userID);
    console.log('country: '+this.state.country);
    console.log('personsInHouse: '+this.state.personsInHouse);
    console.log('houseSize: '+this.state.houseSize);

    const newUser = {
      userID: this.state.userID,
      country: this.state.country,
      personsInHouse: this.state.personsInHouse,
      houseSize: this.state.houseSize
    }

    Axios.post('http://localhost:3000/users/add',newUser).then(res => console.log(res.data));

    this.setState({
      userID:'',
      country:'',
      personsInHouse:'',
      houseSize:''
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
                        <Form.Label>User ID: </Form.Label>
                        <Form.Control type="text" value={this.state.userID} onChange={this.onChangeUserID}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Country: </Form.Label>
                        <Form.Control type="text" value={this.state.country} onChange={this.onChangeUserCountry}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Persons in the House: </Form.Label>
                        <Form.Control type="text" value={this.state.personsInHouse} onChange={this.onChangeUserPersonsInHouse}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Size of the House: </Form.Label>
                        <Form.Control type="text" value={this.state.houseSize} onChange={this.onChangeUserHouseSize}/>
                    </Form.Group>   
                    <Button type="submit" value="Create User">Soumettre</Button> 
                </Form>
                
            </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default Additem;
