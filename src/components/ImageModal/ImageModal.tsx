import Modal from 'react-modal';
import s from "./ImageModal.module.css"


Modal.setAppElement('#root');
import { Image } from '../../types';
type ModalImg = {
    isActive: boolean;
    onClose(): void;
    image: Image;
} 
const ImageModal = ({ isActive, onClose, image } : ModalImg) => {
        if (!image) return null;
        return (
            <Modal
                className={s.modal}
                overlayClassName={s.overlay}
                isOpen={isActive}
                onRequestClose={onClose}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="Image Modal"
                style={{
                content: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    maxWidth: '90%',
                    maxHeight: '90%',
                    overflow: 'hidden',
                },
            }}
            >
                <img className={s.modalImg} src={image.urls.regular} alt={image.alt_description} />
            </Modal>
  
)
}

export default ImageModal;