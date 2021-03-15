import React from 'react';
import s from './ImageGallery.module.css';

const ImageGallery = ({ children, onClick }) => {
  return (
    <ul className={s.ImageGallery} onClick={onClick}>
      {children}
    </ul>
  );
};

export default ImageGallery;
