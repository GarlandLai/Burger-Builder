import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		// purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		console.log(this.props);
		// axios
		// 	.get('https://react-my-burger-a16da.firebaseio.com/ingredients.json')
		// 	.then((response) => this.setState({ ingredients: response.data }))
		// 	.catch((error) => {
		// 		this.setState({ error: true });
		// 	});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchasedCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	// Helper method that from javascript to encodes elements so they can be used in URL
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			'=' +
		// 			encodeURIComponent(this.state.ingredients[i])
		// 	);
		// }
		// // We must pass total price as well to checkout component
		// queryParams.push('price=' + this.state.totalPrice);
		// // Will pass this string to url
		// const queryString = queryParams.join('&');

		this.props.history.push('/checkout');
	};

	render() {
		// will disable the less button if true. Below formats to each ingredient true or false.
		const disabledInfo = {
			...this.props.ings,
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		// Updated this to a ternary to successfully show spinner inside of modal.
		let orderSummary = null;

		let burger = this.state.error ? (
			<p>Ingredients cant be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
						price={this.props.price}
					/>
				</Aux>
			);
			orderSummary = this.state.loading ? (
				<Spinner />
			) : (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelled={this.purchasedCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchasedCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

// addIngredientHandler = (type) => {
// 	const oldCount = this.state.ingredients[type];
// 	const updatedCount = oldCount + 1;
// 	const updatedIngredients = {
// 		...this.state.ingredients,
// 	};
// 	updatedIngredients[type] = updatedCount;
// 	const priceAddition = INGREDIENT_PRICES[type];
// 	const oldPrice = this.state.totalPrice;
// 	const newPrice = oldPrice + priceAddition;
// 	this.setState({
// 		totalPrice: newPrice,
// 		ingredients: updatedIngredients,
// 	});
// 	this.updatePurchaseState(updatedIngredients);
// };

// removeIngredientHandler = (type) => {
// 	const oldCount = this.state.ingredients[type];
// 	if (oldCount <= 0) return;

// 	const updatedCount = oldCount - 1;
// 	const updatedIngredients = {
// 		...this.state.ingredients,
// 	};
// 	updatedIngredients[type] = updatedCount;
// 	const priceAddition = INGREDIENT_PRICES[type];
// 	const oldPrice = this.state.totalPrice;
// 	const newPrice = oldPrice - priceAddition;
// 	this.setState({
// 		totalPrice: newPrice,
// 		ingredients: updatedIngredients,
// 	});
// 	this.updatePurchaseState(updatedIngredients);
// };
