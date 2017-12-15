	//

	import React, { Component}  from 'react';
	import axios from 'axios'
	// import update from 'react-addons-update';
	import '../stylesheets/index.css'
	import { Counter } from './Counter'

	export class SushiMenu extends Component {

		constructor(props) {
			super(props)
			
			this.state = {
				allSushis: [],
				allOrders: {},
				totalBill: 0,
				customerName: "",
				customerEmail: ""
			}
			this.handleOrder = this.handleOrder.bind(this)
			this.handleCheckOut = this.handleCheckOut.bind(this)
			this.getPriceForSushi = this.getPriceForSushi.bind(this)
			this.handleLogin = this.handleLogin.bind(this)
		}

		componentDidMount() {

			var self = this;
			axios.get('http://localhost:8080/')
			.then(function (response) {
				self.setState({allSushis: response.data})
			})
			.catch(function (error) {
				console.log(error);
			})

		}

		handleOrder = (order, isAdding) => {

			// update state value
			// this.setState({allOrders: this.state.allOrders.concat([order])})
			// var updatedAllOrders = update(this.state.allOrders, { $push: [order] })

			var orderDictionary = this.state.allOrders

			if ( isAdding ) {
				if (orderDictionary.hasOwnProperty(order)) {
					orderDictionary[order] += 1
					this.setState({ allOrders: orderDictionary })
				} else {
					orderDictionary[order] = 1
					this.setState({ allOrders: orderDictionary })
				}
			} else {
				if (orderDictionary.hasOwnProperty(order)) {
					orderDictionary[order] -= 1
					this.setState({ allOrders: orderDictionary })
				} else {
					// console.log("❗❗❗ you haven't place your order yet >> " + order)
				}
			}

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
			
	    	// post to server
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
			    checkInTime: 201712131930,
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

	    getPriceForSushi = (sushiName) => {
	    	var sushiIndex = this.state.allSushis.findIndex(sushi => sushi.name === sushiName)
	    	return this.state.allSushis[sushiIndex].price
	    }

	    handleLogin = (name, email) => {
	    	console.log("😈 😈 😈 customer login >> " + name + " " + email)
	    	this.setState({
	    		customerName: name,
	    		customerEmail: email
	    	})
	    }

	    render(){
	    	return (
	    		<div>
	    		<h1>Sushi4U</h1>
	    		<div className="customerInfo">
		    		<h2>Customer Info:</h2>
		    		<h3>Name: <span>{this.state.customerName}</span></h3>
		    		<h3>email: <span>{this.state.customerEmail}</span></h3>
	    		</div>
	    		<div className="leftMenu">	
	    		{this.state.allSushis.map(sushi => {
	    			return (
	    				<div className="leftMenu" key={sushi._id}>
	    				<div className="sushiCell">
	    				<h1>Name: {sushi.name}</h1>
	    				<h1>Price: {sushi.price}</h1>
	    				<h2>Category: {sushi.category}</h2>
	    				<Counter name={sushi.name} onSelectOrder={this.handleOrder}/>
	    				</div>
	    				<div className="clearFloat"></div>
	    				</div>
	    				)
	    		})}
	    		</div>
	    		<div className="rightMenu">
	    		<div>
	    		<h1>Current Order</h1>
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
	    		<button onClick={this.handleCheckOut}>Get Bill</button>
	    		<h3>Here shows the bill</h3>
		    	<div className="billHide" ref="billDiv">
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
	    		</div>
	    		</div>
	    		</div>
	    		)
	    }

	}

