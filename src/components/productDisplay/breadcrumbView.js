import React from 'react';
import './styles.css';

const BreadcrumbView = ({
  currentItemLabel
}) => (<div className="breadcrumbContainer">
    <span>
      <span className="breadcrumbPath">
          Home
        <span className="breadcrumbDivider">></span>
          Homekeeping
        <span className="breadcrumbDivider">></span>
          Aprons
        <span className="breadcrumbDivider">></span>
          Adult Aprons
        <span className="breadcrumbDivider">></span>
      </span>
      <span className="currentBreadcrumb">{currentItemLabel}</span>
    </span>
  </div>);

export default BreadcrumbView;
