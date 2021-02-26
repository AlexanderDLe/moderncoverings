import React from 'react';
import { LabelStyles } from '../FormStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import useMediaQueries from '../../../utils/useMediaQueries';

interface Props {
    value: string;
    label: string;
    measurement?: string;
    description?: string;
}
const RenderFormControlLabel = ({
    value,
    label,
    measurement,
    description,
}: Props) => {
    const styles = LabelStyles();
    const radioQuery = useMediaQueries().min420px
        ? undefined
        : styles.smallQuery;
    const spanQuery = useMediaQueries().min420px
        ? styles.spanDimensions
        : styles.smallSpanDimensions;

    return (
        <FormControlLabel
            className={styles.label}
            value={value}
            control={<Radio color="primary" />}
            label={
                <div className={radioQuery}>
                    {label}
                    <span className={spanQuery}>
                        {measurement}
                        <br />
                        {description}
                    </span>
                </div>
            }
        />
    );
};

export default RenderFormControlLabel;
