import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !this.state.showSideDrawer };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar
					drawerToggle={this.sideDrawToggleHandler}
					isAuth={this.props.isAuthenticated}
				/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};
export default connect(mapStateToProps)(Layout);
