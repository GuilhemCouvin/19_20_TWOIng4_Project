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
        measureID:'',
        type:'',
        creationDate:'',
        value:'',
        sensorID:'' 
      }

    this.onChangeMeasureID = this.onChangeMeasureID.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCreationDate = this.onChangeCreationDate.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeSensorID = this.onChangeSensorID.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeMeasureID(e){
    this.setState({
        measureID: e.target.value
    });
  }

  onChangeType(e){
    this.setState({
        type: e.target.value
    });
  }

  onChangeCreationDate(e){
    this.setState({
        creationDate: e.target.value
    });
  }

  onChangeValue(e){
    this.setState({
        value: e.target.value
    });
  }

  onChangeSensorID(e){
    this.setState({
        sensorID: e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();

    console.log(`Measure updated !`);
    console.log('measureID: '+this.state.measureID);
    console.log('type: '+this.state.type);
    console.log('creationDate: '+this.state.creationDate);
    console.log('value: '+this.state.value);
    console.log('sensorID: '+this.state.sensorID);

    const updateMeasure = {
        measureID: this.state.measureID,
        type: this.state.type,
        creationDate: this.state.creationDate,
        value: this.state.value,
        sensorID: this.state.sensorID
    }
    console.log('body:',updateMeasure);
    Axios.post('http://localhost:3000/measures/update/'+this.props.match.params.id,updateMeasure)
    .then(res => console.log(res.data));
    console.log(this.state.id);
    this.props.history.push('/admin/'+this.props.id);   
  }

  componentDidMount(){
      Axios.get('http://localhost:3000/measures/'+this.props.match.params.id)
      .then(response => {
          this.setState({
            measureID:response.data.measureID,
            type:response.data.type,
            creationDate:response.data.creationDate,
            value:response.data.value,
            sensorID:response.data.sensorID
          })
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
                        <Form.Label>Measure ID: </Form.Label>
                        <Form.Control type="text" value={this.state.measureID} onChange={this.onChangeMeasureID}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Type: </Form.Label>
                        <Form.Control type="text" value={this.state.type} onChange={this.onChangeType}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Date de creation: </Form.Label>
                        <Form.Control type="text" value={this.state.creationDate} onChange={this.onChangeCreationDate}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Valeur: </Form.Label>
                        <Form.Control type="text" value={this.state.value} onChange={this.onChangeValue}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>ID Capteur: </Form.Label>
                        <Form.Control type="text" value={this.state.sensorID} onChange={this.onChangeSensorID}/>
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
