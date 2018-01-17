import React from 'react';
import { PRODUCT_DESCRIPTORS } from '../../constants/productDisplayConstants';
import LargeImageView from './largeImageView';
import SmallImageSelectView from './smallImageSelectView';
import AdditionalInfoView from './additionalInfoView';
import ExpandableMenu from './expandableMenu';
import BreadcrumbView from './breadcrumbView';
import CartNotification from './cartNotification';
import './styles.css';

class ProductDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showCartNotification: false,
      selectedProductIndex: 0,
      selectedItemCounts: PRODUCT_DESCRIPTORS.map((product) => 0),
      expandableMenuState: {
        0: {
          expanded: false,
          text: 'This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.  This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.'
        },
        1: {
          expanded: false,
          text: 'This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.  This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.'
        },
        2: {
          expanded: false,
          text: 'This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.  This section is expanded.  This section can be collapsed by clicking on the "Expanded" text.'
        }
      }
    }

    this.boundImageClickCallback = this._imageClickCallback.bind(this);
    this.boundAddToCartClickCallback = this._addToCartClickCallback.bind(this);
    this.boundUpdateSelectedItem = this._updateSelectedItemCallback.bind(this);
    this.boundExpandableMenuClickCallback = this._expandableMenuClickCallback.bind(this);
  }

  _imageClickCallback (idx) {
    this.setState({selectedProductIndex: idx});
  }

  _addToCartClickCallback() {
    const {
      selectedItemCounts,
      selectedProductIndex
    } = this.state;
    if (selectedItemCounts[selectedProductIndex] > 0) {
      this.setState({showCartNotification: true});
      setTimeout(() => {
        let newSelectedItemCount = selectedItemCounts.concat();
        newSelectedItemCount[selectedProductIndex] = 0;
        this.setState({
          selectedItemCounts: newSelectedItemCount,
          showCartNotification: false
        });
      }, 2000)
    }
  }

  _updateSelectedItemCallback(e) {
    const {
      selectedItemCounts,
      selectedProductIndex
    } = this.state;
    let newSelectedItemCount = selectedItemCounts.concat();
    newSelectedItemCount[selectedProductIndex] = e.target.value;
    return this.setState({selectedItemCounts: newSelectedItemCount});
  }

  _expandableMenuClickCallback(key) {
      const {
        expandableMenuState
      } = this.state;

      let newExpandableMenuState = expandableMenuState;
      newExpandableMenuState[key] = Object.assign(newExpandableMenuState[key], {
        expanded: !expandableMenuState[key].expanded
      });

      this.setState({expandableMenuState: newExpandableMenuState});
  }

  _selectLargeImage() {
    const {
      selectedProductIndex
    } = this.state;
    return PRODUCT_DESCRIPTORS.map((url) => url.majorAssetPath)[selectedProductIndex];
  }

  _selectCurrentLabel() {
    const {
      selectedProductIndex
    } = this.state;

    return PRODUCT_DESCRIPTORS.map((product) => product.label)[selectedProductIndex];
  }

  _selectAdditionalInfo() {
    const {
      selectedProductIndex
    } = this.state;
    return PRODUCT_DESCRIPTORS.map((product) => { return {
        label: product.label,
        description: product.description,
        additionalItems: product.additionalItems,
        price: product.price
      }})[selectedProductIndex];
  }

  _selectSelectedItemCount() {
    const {
      selectedItemCounts,
      selectedProductIndex
    } = this.state;
    return selectedItemCounts[selectedProductIndex];
  }

  render() {
    const {
      selectedProductIndex,
      expandableMenuState,
      showCartNotification
    } = this.state;
    return (
      <div className="productDisplay">
        <BreadcrumbView
          currentItemLabel={this._selectCurrentLabel()}
        />
        <div className="mainProductDisplay">
          { showCartNotification ? <CartNotification
              selectedItemCount={this._selectSelectedItemCount()}
              currentItemLabel={this._selectCurrentLabel()}
            /> : undefined}
          <div className="imagesDisplayContainer">
            <div className="largeImageContainer">
               <LargeImageView
                  imageUrl={this._selectLargeImage()}
               />
             </div>
             <div className="smallImagesContainer">
                <SmallImageSelectView
                  productUrls={PRODUCT_DESCRIPTORS.map((url) => url.minorAssetPath)}
                  selectedProductIndex={selectedProductIndex}
                  clickCallback={this.boundImageClickCallback}
                />
              </div>
            </div>
            <div className="additionalInfoDisplayContainer">
              <AdditionalInfoView
                additionalInfoObject={this._selectAdditionalInfo()}
                selectedItemCount={this._selectSelectedItemCount()}
                updateSelectedItemCallback={this.boundUpdateSelectedItem}
                addToCartClickCallback={this.boundAddToCartClickCallback}
              />
              <ExpandableMenu
                expandableMenuState={expandableMenuState}
                expandableMenuClickCallback={this.boundExpandableMenuClickCallback}
              />
            </div>
          </div>
      </div>
    );
  }
}

export default ProductDisplay;
