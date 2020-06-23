import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
	// Code to transform ingredients
	const ingredients = [];
	console.log(props.ingredients);
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName],
		});
	}

	const ingredientOutput = ingredients.map((ig) => {
		return (
			<span>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	console.log(ingredientOutput);
	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD {props.price.toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
