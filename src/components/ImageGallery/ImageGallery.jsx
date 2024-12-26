import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css'
const ImageGallery = ({ images, activateModal }) => {
    const handleClick = (image) => {
		 activateModal(image);
	}

    return(
        <ul className={s.items}>
            
            {images.map((image) => (
                <li className={s.item } key={image.id} onClick={() =>handleClick(image)}>
                    <ImageCard images={image} />
                    </li>
                ))}
            
        </ul>
)
}

export default ImageGallery;