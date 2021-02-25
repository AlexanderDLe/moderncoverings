import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { LinkerStyles } from './LinkerStyles';

interface Props {
    path: string;
    text: string;
}

const Linker = ({ path, text }: Props) => {
    const styles = LinkerStyles();
    return (
        <Link to={path} className={styles.link}>
            <Button size="small" color="primary">
                {text}
            </Button>
        </Link>
    );
};

export default Linker;
