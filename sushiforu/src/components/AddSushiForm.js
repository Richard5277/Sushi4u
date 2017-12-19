//

import React, { Component}  from 'react';
import axios from 'axios'
import '../stylesheets/index.css'
import '../stylesheets/App.css'
import config from '../config.json'

export class AddSushiForm extends Component {

	constructor(props) {
		  super(props)
		
		  this.state = {
		  	name: "",
		  	price: "",
		  	stock: "",
		  	category: ""
		  }

		  this.handleAddName = this.handleAddName.bind(this)
		  this.handleAddPrice = this.handleAddPrice.bind(this)
		  this.handleAddStock = this.handleAddStock.bind(this)
		  this.handleAddCategory = this.handleAddCategory.bind(this)
		}

	handleAddName(event){
		this.setState({ name : event.target.value })
	}

	handleAddPrice(event){
		this.setState({ price : event.target.value })
	}

	handleAddStock(event){
		this.setState({ stock : event.target.value })
	}

	handleAddCategory(event){
		this.setState({ category : event.target.value })
	}

	addSushi = event => {
		event.preventDefault()
		// pass in the new value >>
		this.setState({
			name : event.target.value,
			price : event.target.value,
			stock : event.target.value,
			category : event.target.value
		})

		axios.post(config.ONLINE_URL + 'addSushi', {
				name: this.state.name,
				price: this.state.price,
				stock: this.state.stock,
				category: this.state.category
			})
			.then(response => {
				console.log("new sushi added >>", response)
			})
			.catch(err => {
				console.log("Add new sushi error >> ", err)
			})

			this.setState = {
			  	name: "",
			  	price: "",
			  	stock: "",
			  	category: ""
			}

	}


	render() {
		return (
			<div>
				<input
		           onChange={this.handleAddName}
		           name="name"
		           className="addNewSushiInputForm"
		           value={this.state.name}
		           placeholder="Enter new sushi name">
	            </input>
	  			<input
		           onChange={this.handleAddPrice}
		           name="price"
		           className="addNewSushiInputForm"
		           value={this.state.price}
		           placeholder="Enter new sushi price">
	            </input>
	            <input
		           onChange={this.handleAddStock}
		           name="stock"
		           className="addNewSushiInputForm"
		           value={this.state.stock}
		           placeholder="Enter new sushi stock">
	            </input>
	            <input
		           onChange={this.handleAddCategory}
		           name="category"
		           className="addNewSushiInputForm"
		           value={this.state.category}
		           placeholder="Enter new sushi category">
	            </input>
	            <button
		            className="addNewSushiButton"
		            type="submit"
		            onClick={this.addSushi} >
		            Add New Sushi
	            </button>
            </div>
		)
	}
	

}







