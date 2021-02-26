import React from 'react';
import Modal from '@material-ui/core/Modal';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ImageModalStyles } from './ImageModalStyles';

interface Props {
    handleAngleStateChange: any;
    min420px: boolean;
    angledState: string;
    handleModalOpen: any;
    modalOpen: boolean;
    data: any;
}

const ImageModal = ({
    handleAngleStateChange,
    min420px,
    angledState,
    handleModalOpen,
    modalOpen,
    data,
}: Props) => {
    const styles = ImageModalStyles();

    const modalActions = (
        <div>
            <ChevronLeftIcon
                onClick={handleAngleStateChange}
                className={styles.modalLeftChevron}
                style={{ fontSize: `${min420px ? '' : ''}` }}
            />
            <ChevronRightIcon
                onClick={handleAngleStateChange}
                className={styles.modalRightChevron}
            />
        </div>
    );
    const modalContent = (
        <div className={styles.modal}>
            <div className={styles.innerModal}>
                <img
                    src={
                        require(`../../../img/ProductPhotos/${angledState}/${data.img}`)
                            .default
                    }
                    alt="Mask"
                    onClick={() => handleModalOpen(false)}
                    style={{ width: '100%', padding: 0 }}
                />
                {data.angled ? modalActions : ''}
            </div>
        </div>
    );

    return (
        <Modal
            open={modalOpen}
            onClose={() => handleModalOpen(false)}
            aria-labelledby="Mask Image"
            aria-describedby="Modal to pop up facemask image."
        >
            {modalContent}
        </Modal>
    );
};
export default ImageModal;
