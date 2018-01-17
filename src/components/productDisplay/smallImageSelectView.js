import React from 'react';
import classNames from 'classnames';
import './styles.css';

// Avoids creating anonymous function for each element in list,
// thereby avoiding unnecessary re-renders
const _invokeClickCallback = (func, param) => {
  func(param)
}

const _generateClass = (selectedProductIndex, idx) => {
  return classNames({
    smallImage: true,
    selectedSmallImage: selectedProductIndex === idx
  });
}

const SmallImageSelectView = ({
      productUrls,
      clickCallback,
      selectedProductIndex
    }) => productUrls.map((url, idx) => (
    <img
      className={_generateClass(selectedProductIndex, idx)}
      src={`${process.env.PUBLIC_URL}${url}`}
      onClick={_invokeClickCallback.bind(this, clickCallback, idx)}
      key={url}
      alt={url}
    />
  ));

export default SmallImageSelectView;
