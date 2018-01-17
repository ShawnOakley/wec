import React from 'react';
import './styles.css';

const _generateHeader = (expandedBoolean) => (
  <div>
    { expandedBoolean ? (
      <img
        src={`${process.env.PUBLIC_URL}/arrow-expanded.png`}
        alt="Item Expanded"
      />
    ) : (
      <img
        src={`${process.env.PUBLIC_URL}/arrow-collapsed.png`}
        alt="Item Expanded"
      />
    ) }
    <span className="expansionText">
      {expandedBoolean ? "EXPANDED" : "COLLAPSED"}
    </span>
  </div>
);

// Avoids creating anonymous function for each element in list,
// thereby avoiding unnecessary re-renders
const _invokeClickCallback = (func, param) => {
  func(param)
}


const ExpandableMenu = ({
      expandableMenuState,
      expandableMenuClickCallback
    }) => (<div className="expandableMenuContainer">
        {Object.keys(expandableMenuState).map((key) => (
          <div className="expandableMenuItem" key={key}>
            <div className="expandableMenuItemHeader" onClick={_invokeClickCallback.bind(this, expandableMenuClickCallback, key)}>
              {_generateHeader(expandableMenuState[key].expanded)}
            </div>
            {expandableMenuState[key].expanded ? (
                <div className="expandableMenuItemText">{expandableMenuState[key].text}</div>
            ) : undefined}
          </div>
        ))}
      </div>);

export default ExpandableMenu;
