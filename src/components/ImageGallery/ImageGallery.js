import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = ({ children, onClick }) => {
  return (
    <ul className={s.ImageGallery} onClick={onClick}>
      {children}
    </ul>
  );
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
