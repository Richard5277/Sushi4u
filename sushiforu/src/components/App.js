import React, { Component } from 'react';

import { AddSushiForm } from './AddSushiForm'
import { SushiMenu } from './SushiMenu'
import { Menu } from './Menu'
import { LoginPage } from './LoginPage'
import { CurrentOrder } from './CurrentOrder'

export class App extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

  	render() {
  		return (
  			<div className="app">
  				<Menu />
	  				{
	  					(this.props.location.pathname === "/") ?
	  					<SushiMenu /> :
	  					(this.props.location.pathname === "/currentorder") ?
	  					<CurrentOrder /> :
	  					<AddSushiForm />
	  				}
  			</div>
  		)
  	}


}
