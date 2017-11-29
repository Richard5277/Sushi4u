import React, { Component } from 'react';
import './App.css';

import { AddSushiForm } from './AddSushiForm'
import { SushiMenu } from './SushiMenu'


class App extends Component {
  render() {
    return (
    	<div>
		    <AddSushiForm /> 
		    <SushiMenu />
      	</div>
    )
  }
}

export default App;
