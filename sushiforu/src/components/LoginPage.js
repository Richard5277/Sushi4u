//
//

import React, { Component}  from 'react'
import axios from 'axios'
import config from '../config.json'

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email:'',
      customerData: {}
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleChangeTableNumber = this.handleChangeTableNumber.bind(this)
  }

  handleChangeName(event) {
    this.setState({name: event.target.value.toLowerCase()})
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value.toLowerCase()})
  }  

  handleChangeTableNumber(event) {
    this.setState({tableNumber: event.target.value.toLowerCase()})
  }

  handleLogin(event) {

    // server GET request with params
/*
    var self = this
    axios.get(config.ONLINE_URL + 'customer/email:' + this.state.email)
    .then(function (response) {
      console.log(" ===================================get customer resopnse >> =================================== ")
      self.props.handleLogin(self.state.name, self.state.email,self.state.tableNumber, response.data[0])  
    })
    .catch(function (error) {
      console.log(error);
    })
*/

    // server GET request with query
    var self = this
    axios.get(config.ONLINE_URL + 'customer',{
      params:{
        email: self.state.email
      }
    })
    .then(function (response) {
      self.props.handleLogin(self.state.name, self.state.email,self.state.tableNumber, response.data[0])  
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (

      <div className="container">
      <h1>Welcome to Sushi4u</h1>

      <label><b>Name</b></label>
      <input type="text" placeholder="Enter Name" value={this.state.value} onChange={this.handleChangeName} required />

      <label><b>Email</b></label>
      <input type="text" placeholder="Enter Email" onChange={this.handleChangeEmail} required />

      <label><b>Table Number</b></label>
      <input type="text" placeholder="Table Number" onChange={this.handleChangeTableNumber} required />  

      <button className="loginButton" onClick={this.handleLogin}>LOGIN</button>
      </div>

      )
  }
}






