import React, { Component } from 'react';
import {Container,Row,Col,Button,FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditMeasure.css';

import Form from 'react-bootstrap/Form'
import Axios from 'axios';


export default class Edit extends Component {
  constructor(props){
    super(props);
    this.state={
        id:props.id,
        creationDate:'',
        location:'',
        userID:'' 
      }

    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeLocation(e){
    this.setState({
        location: e.target.value
    });
  }

  onChangeUserID(e){
    this.setState({
        userID: e.target.value
    });
  }

  onChangeCreationDate(e){
    this.setState({
        creationDate: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    const updateMeasure = {
        location: this.state.location,
        userID: this.state.userID,
        creationDate: this.state.creationDate,

    }
    console.log('body:',updateMeasure);
    Axios.post('http://localhost:3000/sensors/update/'+this.props.match.params.id,updateMeasure)
    .then(res => console.log(res.data));
    console.log(this.state.id);
    this.props.history.push('/users/'+this.state.userID);   
  }

  componentDidMount(){
      Axios.get('http://localhost:3000/sensors/'+this.props.match.params.id)
      .then(response => {
        console.log(response.data[0].location);
          this.setState({
            userID:response.data[0].userID,
            location:response.data[0].location,
            creationDate:response.data[0].creationDate,
            
          })
          console.log(this.state);
      })
      .catch(function(error){
          console.log(error);
      })
  }

  render(){
      console.log('PROPS:',this.props.id);
      console.log('STATE:',this.state.id);
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
                        <Form.Label>Type: </Form.Label>
                        <Form.Control type="text" value={this.state.location} onChange={this.onChangeLocation}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Date de creation: </Form.Label>
                        <Form.Control type="text" value={this.state.creationDate} onChange={this.onChangeCreationDate}/>
                    </Form.Group>

                    <Button type="submit" value="Update">Modifier</Button> 
                </Form>
                
            </Col>
        </Row>
        </Container>
      </div>
    );
  }
}
