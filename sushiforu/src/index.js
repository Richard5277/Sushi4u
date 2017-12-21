//
//

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { HashRouter, Route } from 'react-router-dom';
import './stylesheets/index.css'
import './stylesheets/App.css'
import { AddSushiForm } from './components/AddSushiForm'

ReactDOM.render(
	<HashRouter>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/addsushi" component={AddSushiForm} />
		</div>
	</HashRouter>,
	document.getElementById('root')
)







