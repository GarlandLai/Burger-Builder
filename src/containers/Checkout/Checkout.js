import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	// Will be repalced since these are made up data for now
	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			cheese: 1,
			bacon: 1,
		},
	};
	render() {
		return (
			<div>
				<CheckoutSummary ingredients={this.state.ingredients} />
			</div>
		);
	}
}

export default Checkout;
