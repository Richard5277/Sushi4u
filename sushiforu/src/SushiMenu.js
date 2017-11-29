//

import React, { Component}  from 'react';
import axios from 'axios'

export class SushiMenu extends Component {

	constructor(props) {
	  super(props);
		
	  this.state = {
	  	allSushis: []
	  }
	}

	componentDidMount(){

		var self = this;
		axios.get('http://localhost:8080/')
		 .then(function (response) {
		   console.log(response.data);
		   self.setState({allSushis: response.data})
		 })
		.catch(function (error) {
		   console.log(error);
		})

	}

	render(){
		return (

			<div className="sushiMenu">
				<h1>Sushi4U</h1>
				{this.state.allSushis.map(sushi => {
					return (
						<div className="sushiCell" key={sushi._id}>
							<h1>{sushi.name}</h1>
							<h1>{sushi.price}</h1>
						</div>
					)
				})}
			</div>

		)
	}

}