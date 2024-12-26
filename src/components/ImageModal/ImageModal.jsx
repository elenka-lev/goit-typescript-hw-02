import Modal from 'react-modal';
import s from "./ImageModal.module.css"


Modal.setAppElement('#root');
const ImageModal = ({ isActive, onClose, image }) => {
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