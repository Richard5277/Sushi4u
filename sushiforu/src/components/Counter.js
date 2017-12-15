//
//

import React, { Component}  from 'react';
import '../stylesheets/index.css'

export class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count : 0
		};

		this.incrementCount = this.incrementCount.bind(this)
		this.decrementCount = this.decrementCount.bind(this)
	}

	incrementCount(){
		this.setState({
			count: this.state.count + 1
		})
		this.props.onSelectOrder(this.props.name, true)
	}
	decrementCount(){
		if(this.state.count > 0) {
			this.setState({
				count: this.state.count - 1
			})
			this.props.onSelectOrder(this.props.name, false)
		}
	}

	render(){
		return (
			<div className="counter">
			<h3>Order: {this.state.count}</h3>
			<button className="btn" onClick={this.incrementCount}>+</button>
			<button className="btn" onClick={this.decrementCount}>-</button>
			</div>
			)
	}
}
