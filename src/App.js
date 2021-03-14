import React, { Component } from 'react';

import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import fetchImage from './services/api-service';
import LoaderApp from './components/Loader';

import './App.css';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    showModal: false,
    largeImg: '',
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }

    this.windowScroll();
  }

  windowScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = event => {
    // console.log(event.target)
    const { images } = this.state;

    if (event.target.nodeName === 'IMG') {
      this.toggleModal();
    }

    const targetImg = images.find(({ id }) => id === Number(event.target.id));
    this.setState({ largeImg: targetImg.largeImageURL });
  };

  onChangeQuery = query => {
    this.setState({ searchQuery: query, page: 1, images: [], error: null });
  };

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    // объект настроек(если более двух)
    const options = { searchQuery, page };

    this.setState({ isLoading: true });

    fetchImage(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, showModal, isLoading, largeImg, error } = this.state;

    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.onChangeQuery} />
          {error && <h1>Error</h1>}
          {isLoading && <LoaderApp />}
          <ImageGallery onClick={this.openModal}>
            <ImageGalleryItem images={images} />
          </ImageGallery>
          {images.length > 0 && <Button onClick={this.fetchImages} />}
          {showModal && (
            <Modal largeImg={largeImg} openModal={this.toggleModal} />
          )}
        </div>
      </>
    );
  }
}

export default App;
