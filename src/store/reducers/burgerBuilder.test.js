import reducer from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

describe('burgerBuilder reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			ingredients: null,
			totalPrice: 4,
			error: false,
			building: false,
		});
	});
	// it('should return ingredients', () => {
	// 	expect(
	// 		reducer(
	// 			{
	// 				ingredients: null,
	// 				totalPrice: 4,
	// 				error: false,
	// 				building: false,
	// 			},
	// 			{ type: actionTypes.SET_INGREDIENT }
	// 		)
	// 	).toEqual({
	// 		ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
	// 		totalPrice: 4,
	// 		error: false,
	// 		building: false,
	// 	});
	// });
});
