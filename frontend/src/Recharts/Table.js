import React, {Component} from 'react';
import { Table } from 'reactstrap';
import DeleteUser from './../pages/DeleteUser';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.userID}</td>
    <td>{props.user.country}</td>
    <td>{props.user.personsInHouse}</td>
    <td>{props.user.houseSize}</td>
    <td>
    <Link to={"/delete/"+props.user._id}>Delete</Link>
    </td>
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
        console.log('USERS:',this.state.users);
      })
        .catch(function(error){
          console.log(error);
        })
  }

  usersList(){
    return this.state.users.map(function(currentUser,i){
      console.log('cU:',currentUser._id);
      return <User user={currentUser} key={i} />
    })
  }

  

    render(){
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
                  <th>Action</th>
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