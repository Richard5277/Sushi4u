//
//

import React, { Component}  from 'react';
import axios from 'axios'

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email:''
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
    this.setState({
      name: '',
      email:''
    })
    event.preventDefault()
    // prop to parent
    this.props.onLogin(this.state.name, this.state.email)

    // server GET request
    axios.get('http://localhost:8080/customer'+this.state.email)
      .then(function (response) {
        console.log("👀 👀 👀 fetched customer data >> ", response)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
      <h1>Welcome to Sushi4u</h1>
      <form onSubmit={this.handleLogin}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChangeName} />
          Email:
            <input type="text" name="email" onChange={this.handleChangeEmail}/>
        </label>
        <input type="submit" value="Login" />
      </form>
      </div>
    )
  }
}