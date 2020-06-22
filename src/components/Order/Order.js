import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
	<div className={classes.Order}>
		<p>Ingredients: Salad (1)</p>
		<p>
			Price: <strong>USD 7.45</strong>
		</p>
	</div>
);

export default order;
