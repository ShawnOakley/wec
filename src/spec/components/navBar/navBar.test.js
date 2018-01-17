import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from '../../../components/navBar';

configure({ adapter: new Adapter() });
// test file

let navBar

beforeEach(() => {
  navBar = mount(<NavBar
    selectedKey="homekeeping"
  />);
});

it('renders a Nav Bar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar />, div);
});

it('has the correct headers', () => {
  const headers = navBar.find('.header');
  expect(headers.length).toEqual(2);
  expect(headers.at(0).text()).toEqual("WILLIAMS");
  expect(headers.at(1).text()).toEqual("SONOMA");
});

it('has the correct subheader', () => {
  const subHeaderContainer = navBar.find('.subheaderContainer');
  expect(subHeaderContainer.length).toEqual(1);
  const subHeader = navBar.find('.subheader');
  expect(subHeader.length).toEqual(1);
});

it('has the correct number of tabs and correct classes', () => {
  const tabButtons = navBar.find('.tabButton');
  expect(tabButtons.length).toEqual(11);
  expect(tabButtons.at(0).text()).toEqual("COOKWARE");
  expect(tabButtons.at(1).text()).toEqual("COOKS' TOOLS");
  expect(tabButtons.at(2).text()).toEqual("CUTLERY");
  expect(tabButtons.at(3).text()).toEqual("ELECTRONICS");
  expect(tabButtons.at(4).text()).toEqual("BAKEWARE");
  expect(tabButtons.at(5).text()).toEqual("FOOD");
  expect(tabButtons.at(6).text()).toEqual("TABLETOP & BAR");
  expect(tabButtons.at(7).text()).toEqual("HOMEKEEPING");
  expect(tabButtons.at(8).text()).toEqual("OUTDOOR");
  expect(tabButtons.at(9).text()).toEqual("SALE");
  expect(tabButtons.at(10).text()).toEqual("WILLIAMS-SONOMA HOME");
  const selectedTabButton = navBar.find('.selectedTabButton');
  expect(selectedTabButton.length).toEqual(1);
  expect(selectedTabButton.at(0).text()).toEqual("HOMEKEEPING");
  const tabButtonCallout = navBar.find('.tabButtonCallout');
  expect(tabButtonCallout.length).toEqual(1);
  expect(tabButtonCallout.at(0).text()).toEqual("WILLIAMS-SONOMA HOME");
});

it('should handle click events on unselected tab', () => {
  window.alert = jest.fn();
  let tabButton = navBar.find('.tabButtonCallout')
  tabButton.simulate('click');
  expect(window.alert).toHaveBeenCalledWith('Cannot change tabs in this demo.');
});
