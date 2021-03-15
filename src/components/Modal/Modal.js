import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');

    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    //   метод для очистки за собой(слушатели, таймауты и тд)
    // console.log('Modal componentWillUnmount');

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      // console.log('Нажали ESC, нужно закрыть модалку');
      this.props.openModal();
    }
  };

  handleBackdropClick = event => {
    // console.log('кликнули в бекдроп');
    // console.log('на чем клацнули', event.target);
    // console.log('на чем сработал обработчик события', event.currentTarget);

    if (event.currentTarget === event.target) {
      this.props.openModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.largeImg} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
