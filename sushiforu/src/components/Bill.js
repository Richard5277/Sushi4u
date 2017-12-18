//
//

import React, { Component}  from 'react';
import '../stylesheets/index.css'
import axios from 'axios'

export class Bill extends Component {
	constructor(props) {
		super(props)
		this.state = {
			totalBill: 0,
			customerName: "",
			customerEmail: "",
			allOrders: {}
		}
	}

	componentWillMount() {
		console.log("😈 😈 😈 Bill >>\n", this.props)
		this.setState({ allOrders : this.props.allOrders })
	}

	componentDidMount() {
		console.log("😈 😈 😈 Bill Did Mount >>\n", this.props)
	}

	handleCheckOut = () => {
			var orders = this.state.allOrders
			var temBill = 0
			Object.keys(orders).map((key, index) => {
				var price = this.getPriceForSushi(key)
				var billForThisKindOfSushi = price * orders[key]
				temBill += billForThisKindOfSushi
				return null
			})

			this.setState({ totalBill : temBill })
			this.refs.billDiv.className = 'billShow'
			
	    	var ordersArray = []
	    	Object.keys(orders).forEach(function(key) {
	    		var order = {
	    			"name" : key,
	    			"quantity": orders[key]
	    		}
	    		ordersArray.push(order)
	    	})
	    	console.log(ordersArray)
	    	axios.post('http://localhost:8080/newCustomer', {
	    		customerName: this.state.customerName,
	    		customerEmail: this.state.customerEmail,
	    		tableNumber: 520,
	    		checkInTime: new Date(),
	    		totalBill: temBill,
	    		orders: ordersArray
	    	})
	    	.then(response => {
	    		console.log("new customer added >>", response)
	    	})
	    	.catch(err => {
	    		console.log("Add new customer error >> ", err)
	    	})
	    }

	render(){
		return (
			<div className="billHide">
			<h1>{this.state.customerName}</h1>
			<h1>{this.state.customerEmail}</h1>
			<div>
			{   
				Object.keys(this.state.allOrders).map((key, index) => {

					if ( this.state.allOrders[key] !== 0 ) {
						return (
							<div key={index}>
								<h1>{key} x {this.state.allOrders[key]}</h1>
							</div>
							)
					} else {
						return null
					}
				})
			}
			</div>
			<h1>Total Bill: {this.state.totalBill}</h1>
			</div>
			)
	}
}
