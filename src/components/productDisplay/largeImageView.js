import React from 'react';
import './styles.css';

const LargeImageView = ({
      imageUrl
    }) => (<img
      className="largeImage"
      src={`${process.env.PUBLIC_URL}${imageUrl}`}
      alt={imageUrl}
    />);

export default LargeImageView;
