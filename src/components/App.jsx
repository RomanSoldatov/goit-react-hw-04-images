import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout/Layout';

import { Loader } from '../components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { ModalPicture, ModalDescr } from './/Modal/Modal.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const fetchImages = async (query, page) => {
    try {
      const API_KEY = '34879645-22f56e50c3160d67803a5d79c';
      const API_URL = 'https://pixabay.com/api/';
      const response = await axios.get(`${API_URL}`, {
        params: {
          key: API_KEY,
          q: query,
          image_type: 'all',
          orientation: 'horizontal',
          page: page,
          per_page: 12,
          safesearch: true,
          lang: 'en',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    if (!query) return;

    async function getImages() {
      try {
        setShowButton(true);
        setIsLoading(true);
        const responseImages = await fetchImages(query, page);

        if (!responseImages.hits.length) {
          toast('Sorry, there are no images matching your request...', {
            position: toast.POSITION.TOP_CENTER,
            icon: '🤔',
          });
          return setQuery('');
        }

        const modifiedHits = responseImages.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        setImages(prevImages => [...prevImages, ...modifiedHits]);
        setTotal(responseImages.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [page, query]);

  const handleSearchSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotal(1);
    setIsLoading(false);
    setError(null);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const loadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <Layout>
        {error && <p>Error: {error}</p>}

        <ImageGallery images={images} onImageClick={handleImageClick} />

        {isLoading && <Loader />}

        {!isLoading && total / 12 > page && showButton && (
          <Button onClick={loadMoreBtn} />
        )}

        {showModal && (
          <Modal onModalClose={handleModalClose}>
            {
              <>
                <ModalPicture src={selectedImage.largeImageURL} />
                <ModalDescr>{selectedImage.tags}</ModalDescr>
              </>
            }
          </Modal>
        )}
      </Layout>
      <ToastContainer transition={Slide} draggablePercent={60} />
      <GlobalStyle />
    </>
  );
};
