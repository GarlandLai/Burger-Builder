import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	// This make sure that props.show is different before updating. this also controls update of child (orderSummary)
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show;
	}

	componentDidUpdate() {
		console.log('Modal Will update');
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'transformY(0)' : 'transformY(-100vh)',
						opacity: this.props.show ? '1' : '0',
						pointerEvents: this.props.show ? 'inherit' : 'none',
					}}
				>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}
export default Modal;
