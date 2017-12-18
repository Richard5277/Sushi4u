//

import React, { Component}  from 'react';
import axios from 'axios'
// import update from 'react-addons-update';
import '../stylesheets/index.css'
import { Counter } from './Counter'
// import { Bill } from './Bill'

export class SushiMenu extends Component {

	constructor(props) {
		super(props)

		this.state = {
			allSushis: [],
			allOrders: {},
			totalBill: 0,
			customerName: "",
			customerEmail: "",
			isNewCustomer: true,
			previousOrder:{}
		}
		this.handleOrder = this.handleOrder.bind(this)
		this.handleCheckOut = this.handleCheckOut.bind(this)
		this.getPriceForSushi = this.getPriceForSushi.bind(this)
		this.getPreviousOrderForSushi = this.getPreviousOrderForSushi.bind(this)
	}

	componentWillMount() {

		let previousOrder = (this.props.previousOrder !== undefined && this.props.previousOrder['_id'] !== undefined) ? this.props.previousOrder['orders'] : {}
		var tempAllOrders = {}
		Object.keys(previousOrder).forEach( index => {
			tempAllOrders[previousOrder[index]['name']] = previousOrder[index]['quantity']
		})
		this.setState({
			isNewCustomer : (this.props.previousOrder != undefined && this.props.previousOrder['_id'] != undefined) ? false : true,
			allOrders : tempAllOrders
		})
	}

	componentDidMount() {

		this.setState({
			customerName: this.props.name,
			customerEmail: this.props.email,
			previousOrder: this.props.previousOrder
		})

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
		let orders = this.state.allOrders
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
		console.log("😈 😈 😈 final order array >>\n", ordersArray)

		// seperate by NewCustomer & ReturnedCustomer
		if (this.state.isNewCustomer) {
			console.log("😈 😈 😈 new customer >> (this.state.isNewCustomer)", this.state.isNewCustomer)
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
		} else {
			console.log("😈 😈 😈 returned customer >> (this.state.isNewCustomer)", this.state.isNewCustomer)
		}
		/*
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
		*/
	}

	getPriceForSushi = (sushiName) => {
		let sushiIndex = this.state.allSushis.findIndex(sushi => sushi.name === sushiName)
		return this.state.allSushis[sushiIndex].price
	}

	getPreviousOrderForSushi = (sushiName) => {
		var previousOrder = 0
		this.state.previousOrder["orders"].forEach( (key, value) => {
			if (key['name'] === sushiName) {
				previousOrder = key['quantity']
			}
		})
		return previousOrder
	}

	render(){
		return (
			<div>
				<div className="customerInfo">
					{
						(this.state.isNewCustomer) ?
							<h2><span role="img" aria-label="Clapping Hands">👏</span>
								Welcome To Sushi4U: {this.state.customerName} - {this.state.customerEmail}</h2> :
							<h2><span role="img" aria-label="Red Heart">❤️</span>
								Welcome Back: {this.state.customerName} - {this.state.customerEmail}</h2>
					}
				</div>
				<div className="leftMenu">
					{this.state.allSushis.map(sushi => {

						if (this.state.previousOrder !== undefined && this.state.previousOrder['_id'] !== undefined) {
							let name = sushi.name
							let value = this.getPreviousOrderForSushi(name)
							sushi['previousOrder'] = value
						} else {
							sushi['previousOrder'] = 0
						}

						// update state value
						// this.setState({allOrders: this.state.allOrders.concat([order])})
						// var updatedAllOrders = update(this.state.allOrders, { $push: [order] })

						return (
							<div className="leftMenu" key={sushi._id}>
								<div className="sushiCell">
									<h1>Name: {sushi.name}</h1>
									<h1>Price: {sushi.price}</h1>
									<h2>Category: {sushi.category}</h2>
									<Counter name={sushi.name}
									         onSelectOrder={this.handleOrder}
									         previousOrder={sushi.previousOrder}/>
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
						<div ref="billDiv" className="billHide">
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



