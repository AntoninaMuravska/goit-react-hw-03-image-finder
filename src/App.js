import Modal from './components/Modal';
import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGallery/ImageGalleryItem';
import Button from './components/Button';
import ShowErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import fetchImage from './services/api-service';

import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    status: Status.IDLE,
    error: null,
    largeImg: '',
    showModal: false,
  };

  //реагирует на запись стейта и делает запросы
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      // console.log('Изменился запрос');
      this.fetchImages();
    }
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
    // console.log(event.target);
    // console.log(event.target.nodeName);
    if (event.target.nodeName === 'IMG') {
      this.toggleModal();
    }

    const targetImg = this.state.images.find(
      ({ id }) => id === Number(event.target.id),
    );
    this.setState({ largeImg: targetImg.largeImageURL });
  };

  //делает запись в стейт
  handleSearchbarSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [], error: null });
  };

  fetchImages = () => {
    const { page, searchQuery } = this.state;
    // объект настроек(если более двух)
    const options = { searchQuery, page };

    fetchImage(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
        this.setState({ status: Status.PENDING });
      })
      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
        toast.error('Sorry, try again');
      })
      .finally(() => {
        this.setState({ status: Status.RESOLVED }, () => this.windowScroll());
      });
  };

  render() {
    const { images, status, showModal, largeImg } = this.state;

    if (status === Status.IDLE) {
      return (
        <>
          <SearchBar onSubmit={this.handleSearchbarSubmit}></SearchBar>;
          <ToastContainer autoClose={3000} />
        </>
      );
    }

    if (status === Status.PENDING) {
      return (
        <>
          <SearchBar onSubmit={this.handleSearchbarSubmit}></SearchBar>;
          <Loader />
        </>
      );
    }

    if (status === Status.REJECTED) {
      return <ShowErrorMessage message="Please, try again" />;
    }

    if (status === Status.RESOLVED) {
      return (
        <>
          <div className="App">
            <SearchBar onSubmit={this.handleSearchbarSubmit}></SearchBar>
            <ImageGallery onClick={this.openModal}>
              <ImageGalleryItem images={images} />
            </ImageGallery>
            {images.length > 0 && <Button onClick={this.fetchImages}></Button>}
            {showModal && (
              <Modal largeImg={largeImg} openModal={this.toggleModal} />
            )}
            <ToastContainer autoClose={3000} />
          </div>
        </>
      );
    }
  }
}

export default App;
