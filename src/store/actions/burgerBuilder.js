import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	};
};

export const fetchIngredientFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENT_FAILED,
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		// I can execute async code within here due to redux thunk
		axios
			.get('https://react-my-burger-a16da.firebaseio.com/ingredients.json')
			.then((response) => {
				dispatch(setIngredients(response.data));
			})
			.catch((error) => {
				dispatch(fetchIngredientFailed());
			});
	};
};
