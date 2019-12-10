import React, {Component} from 'react';
import { Table } from 'reactstrap';

import { link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.userID}</td>
    <td>{props.user.country}</td>
    <td>{props.user.personsInHouse}</td>
    <td>{props.user.houseSize}</td>
  </tr>
)

class Tablechart extends Component{
  
  constructor(props){
    super(props);
    this.state ={
      users: []
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

  usersList(){
    return this.state.users.map(function(currentUser,i){
      return <User user={currentUser} key={i} />
    })
  }


  // state = {
  //   list: this.props.data,
  //   index: this.props.data.length,
  // };

  

    render(){
      console.log('taille:'+this.state.index);
        return (
          <div>
          <h3 style={{textAlign: 'center',marginTop:26}}>Liste des utilisateurs   </h3>
            <Table dark>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Country</th>
                  <th>Persons number</th>
                  <th>House Size</th>
                </tr>
              </thead>
              <tbody>
                {this.usersList()}
              </tbody>
            </Table>
            </div>
          );
    }
  
}

export default Tablechart;