import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
    callback?: () => void;
}

const ContainedButton = ({ callback }: Props) => {
    return (
        <Button
            variant="contained"
            onClick={callback}
            size="medium"
            color="primary"
            style={{ width: '100%' }}
        >
            Add To Cart
        </Button>
    );
};

export default ContainedButton;
