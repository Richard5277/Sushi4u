//
//

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
// import { LoginPage } from './components/LoginPage';
import { HashRouter, Route } from 'react-router-dom';
import './stylesheets/index.css'
import './stylesheets/App.css'


ReactDOM.render(
	<HashRouter>
		<div>
			<Route exact path="/" component={App} />
			<Route path="currentorder" component={App} />
			<Route path="addsushi" component={App} />
		</div>
	</HashRouter>,
	document.getElementById('root')
)







