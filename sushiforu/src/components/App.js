import React, { Component } from 'react';

import { AddSushiForm } from './AddSushiForm'
import { SushiMenu } from './SushiMenu'
import { Menu } from './Menu'
import { LoginPage } from './LoginPage'

export class App extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	isLoggedIn: false,
	  	previousOrder: {}
	  }

	  this.handleLogin = this.handleLogin.bind(this) 
	}

	handleLogin = (name, email, tableNumber, previousOrder) => {
		this.setState({
      		isLoggedIn: true,
      		name: name,
      		email: email,
          tableNumber: tableNumber,
      		previousOrder: previousOrder,
      		key: Math.random()
    	})

	}

 	render() {
  		return (
  			<div className="app">
	  			<div className={(this.state.isLoggedIn) ? "hide" : "show"}>
	  			<LoginPage handleLogin={this.handleLogin} />
	  			</div>
  				<div className={(this.state.isLoggedIn) ? "show" : "hide"}>
  				<Menu />
  				{
  					(this.props.location.pathname === "/") ?
  					<SushiMenu name={this.state.name} 
                       email={this.state.email}
                       tableNumber={this.state.tableNumber}
                       key={this.state.key} 
                       previousOrder={this.state.previousOrder} /> :
  					<AddSushiForm />
  				}
  				</div>
  			</div>
  		)
  	}

}






