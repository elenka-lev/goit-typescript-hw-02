import SearchBar from './SearchBar/SearchBar';
import fetchImages from './api';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css'
import { useState, useEffect } from 'react';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';

const App =() => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  }
  const handleClearQuery = () => {
    setSearchQuery('');
  };

  const handleLoadMore = () => {
  setPage((prevPage) => prevPage + 1);
};
  const activateModal = (image) => {
    
      setSelectedImage(image);
      setIsModal(true);
    
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {

    if (!searchQuery) return;

    

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const imagesData = await fetchImages(searchQuery, page);

        if (imagesData.length === 0 && page === 1) {
          toast.warning('No images matching your search query. Please try again!');
        }
        setImages((prevImages) => [...prevImages, ...imagesData.results]);
        setTotalImages(imagesData.total);
      }
      catch (error) {
        console.error(error);
        setIsError(true);
        toast.error("Failed to load images! Try again");
      }
      finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [searchQuery, page]);
  return (
    <>
      
      <SearchBar query={searchQuery} onSubmit={handleSearch} onClear={handleClearQuery} />
     <div className='container'> 
      <ToastContainer autoClose={3000}/>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery images={images} activateModal={activateModal}/>
      {images.length > 0 && page < totalImages && (
        <LoadMoreBtn onClick={handleLoadMore} />
        )}
        </div>
      {isModal && selectedImage && <ImageModal isActive={isModal} image={selectedImage} onClose={closeModal} />}
    </>
  )
}

export default App;
