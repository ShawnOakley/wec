import React from 'react';
import classNames from 'classnames';
import { NAV_TAB_DESCRIPTORS } from '../../constants/navBarConstants';
import './styles.css';

const _formatHeader = () => (<div>
    <h1 className={"header"}>{"WILLIAMS"}</h1>
    <h1 className={"header"}>{"SONOMA"}</h1>
    <div className={"subheaderContainer"}><h3 className={"subheader"}>{"CALIFORNIA"}</h3></div>
  </div>)

const _formatTabRow = (selectedKey) => (<div className="tabRow">
    {
      NAV_TAB_DESCRIPTORS.map((descriptor)=> _formatTabButton(descriptor, selectedKey))
    }
  </div>)

const _formatTabButton = (descriptor, selectedKey) => {
    const {
      key,
      label,
      callout
    } = descriptor;
    let tabStyle = classNames({
      tabButton: true,
      tabButtonCallout: !!callout,
      selectedTabButton:  selectedKey === key
    });
    return <div
        key={key}
        className={tabStyle}
        onClick={()=>{alert("Cannot change tabs in this demo.")}}
      >
        {label}
      </div>
}

const NavBar = ({selectedKey}) => (
  <div>
    {_formatHeader()}
    {_formatTabRow(selectedKey)}
  </div>
);

export default NavBar;
