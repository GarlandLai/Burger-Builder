import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			zipCode: '',
		},
	};

	orderHandler = () => {};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Please Enter your Contact Info</h4>
				<form>
					<input
						className={classes.Input}
						type="text"
						name="name"
						placeholder="Your Name"
					/>
					<input
						className={classes.Input}
						type="text"
						name="email"
						placeholder="Your Email"
					/>
					<input
						className={classes.Input}
						type="text"
						name="street"
						placeholder="Your Street"
					/>
					<input
						className={classes.Input}
						type="text"
						name="zipCode"
						placeholder="Your Zip Code"
					/>
					<Button btnType="Success" clicked={this.orderHandler}>
						ORDER
					</Button>
				</form>
			</div>
		);
	}
}

export default ContactData;
