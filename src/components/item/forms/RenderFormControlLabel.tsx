import React from 'react';
import { LabelStyles } from './FormStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import useMediaQueries from '../../utils/useMediaQueries';

interface Props {
    value: string;
    label: string;
    measurement?: string;
    description?: string;
    XLUnavailable?: boolean;
}
const RenderFormControlLabel = ({
    value,
    label,
    measurement,
    description,
    XLUnavailable,
}: Props) => {
    const styles = LabelStyles();
    const radioQuery = useMediaQueries().min420 ? undefined : styles.smallQuery;
    const spanQuery = useMediaQueries().min420
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
                        {XLUnavailable ? 'Unavailable' : description}
                    </span>
                </div>
            }
            disabled={XLUnavailable}
        />
    );
};

export default RenderFormControlLabel;
