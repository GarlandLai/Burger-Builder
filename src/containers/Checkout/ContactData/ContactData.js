import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipCode: '',
		},
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Garland Lai',
				address: {
					street: 'Random street',
					zipCode: '94111',
					country: 'US',
				},
				email: 'email@test.com',
			},
			deliveryMethod: 'fastest',
		};
		axios
			// if you want to see error handling, remove the .json (which is needed) or make a typo on url
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => this.setState({ loading: false }));
	};

	render() {
		let form = (
			<form>
				<Input
					inputtype="input"
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<Input
					inputtype="input"
					type="text"
					name="email"
					placeholder="Your Email"
				/>
				<Input
					inputtype="input"
					type="text"
					name="street"
					placeholder="Your Street"
				/>
				<Input
					inputtype="input"
					type="text"
					name="zipCode"
					placeholder="Your Zip Code"
				/>
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Please Enter your Contact Info</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
