import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css'
import { Image } from '../../types';
type ImageGalleryProps = {
  images: Image[];
  activateModal: (image: Image) => void; 
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, activateModal }) => {
    const handleClick = (image: Image): void => {
        activateModal(image);
    }
  
    return (
        <ul className={s.items}>
            
            {images.map((image: Image) => (
                <li
                    className={s.item}
                    key={image.id}
                    onClick={() => handleClick(image)}>
                    
                    <ImageCard image={image} />
                    </li>
            ))}
        </ul>
    )
}
export default ImageGallery;