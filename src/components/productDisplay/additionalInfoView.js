import React from 'react';
import './styles.css';

const _generateAdditionalItemsList = (additionalItems) => (<ul>
      {additionalItems.map(additionalItem => <li
        key={additionalItem}
        className="additionalInfoListItem"
      >
        {additionalItem}
      </li>)}
    </ul>);

const AdditionalInfoView = ({
      additionalInfoObject,
      addToCartClickCallback,
      selectedItemCount,
      updateSelectedItemCallback
    }) => (
      <div>
        <div className="additionalInfoLabel">
          {additionalInfoObject.label}
        </div>
        <div className="additionalInfoDescription">
          {additionalInfoObject.description}
        </div>
        <div className="additionalInfoListItemContainer">
          {_generateAdditionalItemsList(additionalInfoObject.additionalItems)}
        </div>
        <div className="additionalInfoPrice">
          {`$${additionalInfoObject.price}`}
        </div>
        <div className="additionalInfoItemCountInputContainer">
          <input
            name="numberOfGuests"
            type="number"
             min="0"
            className="additionalInfoItemCountInput"
            value={selectedItemCount}
            onChange={updateSelectedItemCallback} />
        </div>
        <div className="additionalInfoItemCartButtonContainer">
          <img
            className="additionalInfoItemCartButton"
            src={`${process.env.PUBLIC_URL}/button-add-to-cart.png`}
            alt="Add To Cart"
            onClick={addToCartClickCallback}
          />
        </div>
      </div>
  );

export default AdditionalInfoView;
