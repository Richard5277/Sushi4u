// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();



import React from 'react';
import ReactDOM from 'react-dom'
import { App } from './components/App'
import { HashRouter, Route } from 'react-router-dom';
import './stylesheets/index.css'
import './stylesheets/App.css'

// window.React = React


ReactDOM.render(
	<HashRouter>
		<div>
			<Route exact path="" component={App} />
			<Route path="currentorder" component={App} />
			<Route path="addsushi" component={App} />
		</div>
	</HashRouter>,
	document.getElementById('root')
)







