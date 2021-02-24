import React from 'react';
import { Link } from 'react-router-dom';
import { FooterStyles } from './FooterStyles';

export const Footer = () => {
    const styles = FooterStyles();

    return (
        <footer className={styles.footer}>
            <p>
                If you have any questions or concerns, please email
                contact@moderncoverings.com
            </p>
            <br />
            <p>
                {'Copyright © '}
                ModernCoverings.com {new Date().getFullYear()} |{' '}
                <Link to="/policies" className={styles.footerLink}>
                    Policies
                </Link>{' '}
                |{' '}
                <Link to="/faq" className={styles.footerLink}>
                    FAQ
                </Link>{' '}
                <a
                    className={styles.footerLink}
                    href="https://www.paypal.com/us/webapps/mpp/ua/acceptableuse-full"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {' '}
                    | PayPal AUP
                </a>
            </p>
        </footer>
    );
};

export default Footer;
