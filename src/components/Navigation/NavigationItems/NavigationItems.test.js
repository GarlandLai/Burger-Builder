import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});

	it('should render two navigation items elements if not authenticated', () => {
		// Use the beforeEach instead
		// const wrapper = shallow(<NavigationItems />);
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should render three navigation items elements if authenticated', () => {
		// Could set below without const
		// wrapper = shallow(<NavigationItems isAuthenticated />);
		// or use this helper function
		wrapper.setProps({ isAuthenticated: true });
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});
});
