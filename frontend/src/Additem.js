import React, { Component } from 'react';
import {Container,Row,Col,Button,InputGroup} from 'react-bootstrap';
import './Additem.css';

import Form from 'react-bootstrap/Form'


class Additem extends Component {

  render(){
    // console.log(this.state.moyenne.maths);

    return (
      <div>
        <Container>
        <Row>
            <Col 
            className="form" 
            style={{color: 'white'}}
            md={{ span: 6, offset: 3 }}>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Date: </Form.Label>
                        <Form.Control type="textarea"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Matière: </Form.Label>
                        <Form.Control as="select">
                            <option>Maths</option>
                            <option>Physics</option>
                        </Form.Control>
                    </Form.Group> 
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Note: </Form.Label>
                        <Form.Control type="textarea"/>
                    </Form.Group>  
                    <Button>Soumettre</Button> 
                </Form>
                
            </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default Additem;
