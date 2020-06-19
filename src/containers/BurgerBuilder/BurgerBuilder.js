import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	};

	componentDidMount() {
		console.log('burgerBuilder', this.props);
		axios
			.get('https://react-my-burger-a16da.firebaseio.com/ingredients.json')
			.then((response) => this.setState({ ingredients: response.data }))
			.catch((error) => {
				this.setState({ error: true });
			});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;

		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchasedCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		// // alert('Continue');
		// this.setState({ loading: true });
		// const order = {
		// 	ingredient: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Garland Lai',
		// 		address: {
		// 			street: 'Random street',
		// 			zipCode: '94111',
		// 			country: 'US',
		// 		},
		// 		email: 'email@test.com',
		// 	},
		// 	deliveryMethod: 'fastest',
		// };
		// axios
		// 	// if you want to see error handling, remove the .json (which is needed) or make a typo on url
		// 	.post('/orders.json', order)
		// 	.then((response) => this.setState({ loading: false, purchasing: false }))
		// 	.catch((error) => this.setState({ loading: false, purchasing: false }));
	};

	render() {
		// will disable the less button if true. Below formats to each ingredient true or false.
		const disabledInfo = {
			...this.state.ingredients,
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
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Aux>
			);
			orderSummary = this.state.loading ? (
				<Spinner />
			) : (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseCancelled={this.purchasedCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
