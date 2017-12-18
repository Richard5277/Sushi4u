//
//

import React, { Component}  from 'react'
import axios from 'axios'

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
  }

  handleChangeName(event) {
    this.setState({name: event.target.value.toLowerCase()})
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value.toLowerCase()})
  }  

  handleLogin(event) {
    
    // server GET request
    var self = this
    axios.get('http://localhost:8080/customer'+self.state.email)
      .then(function (response) {
        self.props.handleLogin(self.state.name, self.state.email, response.data[0])  
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  render() {
    return (
      <div>
      <h1>Welcome to Sushi4u</h1>
      <label>
        Name:
        <input type="text" value={this.state.value} onChange={this.handleChangeName} />
        Email:
          <input type="text" name="email" onChange={this.handleChangeEmail}/>
      </label>
      <button onClick={this.handleLogin}>LOGIN</button>
      </div>
    )
  }
}






