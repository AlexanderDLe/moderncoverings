import React from 'react';
import useMediaQueries from '../../utils/useMediaQueries';
import ChristmasIcon from '../../../img/Icons/ChristmasIcon.png';
import { BannerStyles, bannerHeight } from './BannerStyles';

const Banner: React.FC = () => {
    const styles = BannerStyles();
    const bannerStyle = bannerHeight(useMediaQueries().min600px);

    return (
        <div className={styles.banner} style={bannerStyle}>
            <BannerFlag mediaQuery={useMediaQueries().min420px} />
            <div className={styles.textbox}>
                <p>
                    Use Code <strong>15OFF</strong> And Get 15% Off 45$+ Orders
                </p>
            </div>
            <BannerFlag mediaQuery={useMediaQueries().min420px} />
        </div>
    );
};

const BannerFlag = ({ mediaQuery }: { mediaQuery: boolean }) => {
    const styles = BannerStyles();
    return mediaQuery ? (
        <img alt="Flag" className={styles.flag} src={ChristmasIcon} />
    ) : null;
};

export default Banner;
