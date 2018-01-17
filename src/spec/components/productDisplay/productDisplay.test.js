import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductDisplay from '../../../components/productDisplay';

configure({ adapter: new Adapter() });
// test file

let productDisplay;

const initialState = { showCartNotification: false,
  selectedProductIndex: 0,
  selectedItemCounts: [ 0, 0, 0, 0 ],
  expandableMenuState:
   { '0':
      { expanded: false,
        text: 'This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.  This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.' },
     '1':
      { expanded: false,
        text: 'This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.  This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.' },
     '2':
      { expanded: false,
        text: 'This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.  This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.' }
      }
}

beforeEach(() => {
  productDisplay = mount(<ProductDisplay />);
});

it('renders Product Display without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductDisplay />, div);
});

it('should correctly initialize state', () => {
  expect(productDisplay.state()).toEqual(initialState);
});

it('should correctly display breadcrumb view and update on state change', () => {
  const breadcrumbView = productDisplay.find('.breadcrumbContainer');
  expect(breadcrumbView.text()).toEqual('Home>Homekeeping>Aprons>Adult Aprons>Williams-Sonoma Classic Apron, FrenchBlue');
  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  expect(breadcrumbView.text()).toEqual('Home>Homekeeping>Aprons>Adult Aprons>Williams-Sonoma Classic Apron, StripedBlue');
});

it('should correctly display large image view and update on state change', () => {
  let largeImageView = productDisplay.find('.largeImage');
  expect(largeImageView.prop('src')).toEqual('/product-large-a.jpg');
  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  largeImageView = productDisplay.find('.largeImage');
  expect(largeImageView.prop('src')).toEqual('/product-large-b.jpg');
});

it('should correctly display small image views and update class on click', () => {
  let smallImageViews = productDisplay.find('.smallImagesContainer').children().children();
  expect(smallImageViews.length).toEqual(4);
  expect(smallImageViews.at(0).hasClass('selectedSmallImage')).toEqual(true);
  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  smallImageViews = productDisplay.find('.smallImagesContainer').children().children();
  expect(smallImageViews.at(0).hasClass('selectedSmallImage')).toEqual(false);
  expect(smallImageViews.at(1).hasClass('selectedSmallImage')).toEqual(true);
});

it('should correctly display label and update on state change', () => {
  let labelView = productDisplay.find('.additionalInfoLabel');
  expect(labelView.text()).toEqual('Williams-Sonoma Classic Apron, FrenchBlue');
  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  expect(labelView.text()).toEqual('Williams-Sonoma Classic Apron, StripedBlue');
});

it('should correctly display description and update on state change', () => {
  let description1 = "A generously sized apron is a necessity to any kitchen, and ours will brighten yours with lively color. Sewn of thick cotton, it can be personalized or monogrammed with up to nine characters, all the same height, embroidered in your choice of color. An apron of this quality makes a welcome gift for any cook."
  let description2 = "A generously sized apron is a necessity to any kitchen, and ours will brighten yours with lively color. Sewn of thick cotton, it can be personalized or monogrammed with up to nine characters, all the same height, embroidered in your choice of color. An apron of this quality makes a welcome gift for any cook."
  // Note state change check isn't actually testing anything significant for since all descriptionsa are the same
  let labelView = productDisplay.find('.additionalInfoDescription');
  expect(labelView.text()).toEqual(description1);
  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  expect(labelView.text()).toEqual(description2);
});

it('should correctly list additional items and update on state change', () => {
  let items1 = [
    "Durable 100% cotton construction.",
    "Adjusted beckband ensures a good fit.",
    "Roomy front pockets hold small tools.",
    "Machine-wash."
  ];

  let items2 = [
    "Durable 100% cotton construction.",
    "Adjusted beckband ensures a good fit.",
    "Roomy front pockets hold small tools.",
    "Machine-wash."
  ];
  // Note state change check isn't actually testing anything significant for since all items are the same
  // However test should work in principle.  Would just need the alternate strings to test against.
  let listItems = productDisplay.find('.additionalInfoListItemContainer').find("li");
  expect(listItems.length).toEqual(items1.length);
  expect(listItems.at(0).text()).toEqual(items1[0]);
  expect(listItems.at(1).text()).toEqual(items1[1]);
  expect(listItems.at(2).text()).toEqual(items1[2]);
  expect(listItems.at(3).text()).toEqual(items1[3]);

  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  expect(listItems.length).toEqual(items2.length);
  expect(listItems.at(0).text()).toEqual(items2[0]);
  expect(listItems.at(1).text()).toEqual(items2[1]);
  expect(listItems.at(2).text()).toEqual(items2[2]);
  expect(listItems.at(3).text()).toEqual(items2[3]);
});

it('should correctly list prices and update on state change', () => {
  let price1 = "$19.95";
  let price2 = "$19.95";
  // Note state change check isn't actually testing anything significant for since all prices are the same
  // However test should work in principle.  Would just need the alternate strings to test against.
  let priceInfo = productDisplay.find('.additionalInfoPrice');
  expect(priceInfo.text()).toEqual(price1);

  const newSelectedItem = productDisplay.find('.smallImage').at(1);
  newSelectedItem.simulate('click');
  expect(priceInfo.text()).toEqual(price2);
});

it('should update state of container component when info item input updates', () => {
  let infoItemInput = productDisplay.find('.additionalInfoItemCountInput');
  expect(infoItemInput.prop('value')).toEqual(0);
  expect(productDisplay.state().selectedItemCounts).toEqual([0,0,0,0]);
  infoItemInput.simulate('change', { target: { value: 3 } })
  infoItemInput = productDisplay.find('.additionalInfoItemCountInput');
  expect(infoItemInput.prop('value')).toEqual(3);
  expect(productDisplay.state().selectedItemCounts).toEqual([3,0,0,0]);
});

it('should trigger add to cart display when item count is greater than 0', () => {
  let infoItemInput = productDisplay.find('.additionalInfoItemCountInput');
  let additionalInfoItemCartButton = productDisplay.find('.additionalInfoItemCartButton');
  expect(infoItemInput.prop('value')).toEqual(0);
  additionalInfoItemCartButton.simulate('click')
  expect(productDisplay.state().showCartNotification).toEqual(false);
  infoItemInput.simulate('change', { target: { value: 3 } })
  additionalInfoItemCartButton = productDisplay.find('.additionalInfoItemCartButton');
  additionalInfoItemCartButton.simulate('click');
  infoItemInput = productDisplay.find('.additionalInfoItemCountInput');
  expect(infoItemInput.prop('value')).toEqual(3);
  expect(productDisplay.state().showCartNotification).toEqual(true);
});

it('should trigger expansion of expandableMenu on click', () => {
  let expandableMenuItems = productDisplay.find('.expandableMenuContainer').children();
  let expandableMenuItemText = productDisplay.find('.expandableMenuItemText');
  expect(expandableMenuItems.length).toEqual(3);
  expect(expandableMenuItemText.length).toEqual(0);
  expect(expandableMenuItems.at(0).text()).toEqual("COLLAPSED");
  productDisplay.find('.expandableMenuItemHeader').at(0).simulate('click');
  let expandableMenuHeader = productDisplay.find('.expandableMenuItemHeader');
  expandableMenuItemText = productDisplay.find('.expandableMenuItemText')
  expect(expandableMenuHeader.at(0).text()).toEqual("EXPANDED");
  expect(expandableMenuItemText.length).toEqual(1);
  expect(expandableMenuItemText.at(0).text()).toEqual("This section is expanded.  This section can be collapsed by clicking on the \"Expanded\" text.  This section is expanded.  This section can be collapsed by clicking on the \"Expanded\" text.");
});
