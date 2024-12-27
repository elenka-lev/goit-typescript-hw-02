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

 interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string;
}

const App : React.FC =()  => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalImages, setTotalImages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModal, setIsModal] = useState <boolean> (false);

  const handleSearch = (query: string) : void => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  }

  const handleLoadMore = () : void => {
  setPage((prevPage : number) => prevPage + 1);
};
  const activateModal = (image : Image) : void => {
    
      setSelectedImage(image);
      setIsModal(true);
    
  };

  const closeModal = () : void => {
    setIsModal(false);
    setSelectedImage(null);
  };

  useEffect(() : void => {

    if (!searchQuery) return;

    

    const getData = async () : Promise<void> => {
      try {
        setIsLoading(true);
        setIsError(false);
        const imagesData = await fetchImages(searchQuery, page);

        if (imagesData.results.length === 0 && page === 1) {
          toast.warning('No images matching your search query. Please try again!');
        }
        setImages((prevImages) : Image[] => prevImages ? [...prevImages, ...imagesData.results] : [...imagesData.results]);
        setTotalImages(imagesData.total);
      }
      catch (error : any) {
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
      
      <SearchBar onSubmit={handleSearch}  />
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
