import s from './ImageCard.module.css'
const ImageCard = ({ images }) => {
    if (!images || !images.urls) return null;
    return (
        <div className={s.wrap}>
            <img src={images.urls.small} alt={images.alt_description} className={s.img} width="300" height="200" loading="lazy" /> 
        </div>
    )
}
export default ImageCard;