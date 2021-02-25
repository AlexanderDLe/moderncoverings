import React from 'react';
import { ItemImageStyles } from './ItemImageStyles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface Props {
    min420px: boolean;
    handleModalOpen: () => void;
    handleAngleStateChange: () => void;
    angledState: boolean;
    data: any;
}

const ItemImage = ({
    min420px,
    handleModalOpen,
    handleAngleStateChange,
    angledState,
    data,
}: Props) => {
    const styles = ItemImageStyles();

    return (
        <CardContent style={{ position: 'relative' }}>
            <CardMedia
                className={min420px ? styles.media : styles.smallMedia}
                image={
                    require(`../../../img/ProductPhotos/${angledState}/${data.img}`)
                        .default
                }
                title={data.color}
                onClick={handleModalOpen}
                style={{ cursor: 'pointer' }}
            />
            {data.angled ? (
                <React.Fragment>
                    <ChevronLeftIcon
                        onClick={handleAngleStateChange}
                        className={styles.modalLeftChevron}
                        style={{
                            fontSize: `${min420px ? '' : ''}`,
                        }}
                    />
                    <ChevronRightIcon
                        onClick={handleAngleStateChange}
                        className={styles.modalRightChevron}
                    />
                </React.Fragment>
            ) : (
                ''
            )}
        </CardContent>
    );
};

export default ItemImage;
