import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Button, NavbarItem } from 'react-bootstrap';
import './App.css';

import axios from 'axios';

import Dashboard from './pages/Dashboard';
import Additem from './pages/Additem';

import "react-circular-progressbar/dist/styles.css";


const UserLink = props => (
<Link to={`/users/${props.user.userID}`}  className="navbar-brand">DashUser {props.user.userID + 1 }</Link>
)

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      users: [],
      id:''
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
        return <UserLink user={currentUser} key={i} />
      
    })
  }

  render(){
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to='/admin' className="navbar-brand">Admin</Link>
            {this.usersLinkList()}
          </nav>
          <Container>
            {/* <Route path='/users/:id' exact component={Dashboard} /> */}

            <Route exact path='/users/:id' render={props => (
              <Dashboard {...props} id={this.state.id} />
            )}
          />

            <Route path='/' exact component={Dashboard} />
            <Route path='/admin'  component={Additem} />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
