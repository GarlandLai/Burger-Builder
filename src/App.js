import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../src/containers/Checkout/Checkout';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					{/* Could use switch or just exact. Both shown for below but not needed */}
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
