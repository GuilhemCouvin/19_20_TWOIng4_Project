import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Button, NavbarItem } from 'react-bootstrap';
import './App.css';

import axios from 'axios';

import Dashboard from './pages/Dashboard';
import Additem from './pages/Additem';
import EditMeasure from './pages/EditMeasure';
import DeleteUser from './pages/DeleteUser';

import "react-circular-progressbar/dist/styles.css";


const UserLink = props => (
<Link to={`/users/${props.user._id}`}  className="navbar-brand">{props.it + 1 } </Link>
)

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      users: [],
      id:'',
      i:0
    }
  }
    
  componentDidMount(){
    axios.get('http://localhost:3000/users/')
      .then(response => {
        this.setState({users:response.data});
      })
        .catch(function(error){
          console.log(error);
        })
  }

  usersLinkList(){
    return this.state.users.map(function(currentUser,i){
        return <UserLink user={currentUser} it={i }key={i} />
      
    })
  }

  render(){
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={`/users/5ddb94c6fc13ae640c000014`}>Users: </Link>
            {this.usersLinkList()}
            <Link to='/admin' className="navbar-brand">Admin</Link>
          </nav>
          <Container>
            <Route exact path='/users/:id' render={props => (<Dashboard {...props} id={this.state.id} />)}/>
            <Route path='/' exact component={Dashboard} />
            <Route path='/admin'  component={Additem} />
            <Route exact path='/edit/:id' render={props => (<EditMeasure {...props} id={this.state.id} />)}/>
            <Route exact path='/delete/:id' render={props => (<DeleteUser {...props} id={this.state.id} />)}/>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
