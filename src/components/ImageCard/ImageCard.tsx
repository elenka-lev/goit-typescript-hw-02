import s from './ImageCard.module.css'

 interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string;
}
interface ImageCardProps {
  image: Image;
}
const ImageCard : React.FC<ImageCardProps> = ({ image }) => {
    
    return (
        <div className={s.wrap}>
            <img src={image.urls.small} alt={image.alt_description} className={s.img} width="300" height="200" loading="lazy" /> 
        </div>
    )
}
export default ImageCard;