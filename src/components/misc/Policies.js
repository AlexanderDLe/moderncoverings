import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 750,
        borderBottom: '2px solid #3f51b5',
        padding: 16,
        margin: 24,
        marginTop: 40,
    },
    question: {
        paddingLeft: 10,
        fontSize: '1.15rem',
        paddingTop: 12,
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            height: 'calc(100% - 12px)',
            width: '2px',
            backgroundColor: '#3f51b5',
            position: 'absolute',
            left: '-0px',
        },
    },
});

function Policies() {
    const classes = useStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Card className={classes.root} elevation={3}>
            <h2>Policies</h2>
            <hr />
            <h5 className={classes.question}>Return/Exchange Policy</h5>
            <p>
                You may choose to return or exchange a product within 14 days,
                but you will be required to pay for shipping costs (if
                applicable).
            </p>
            <h5 className={classes.question}>Customer Service Policy</h5>
            <p>
                If you have questions or comments about this policy, you may
                email us at contact@cafacemasks.com.
            </p>
            <h5 className={classes.question}>Privacy Policy</h5>
            <p>
                Thank you for choosing to be part of our community at CA
                Facemasks. We are committed to guarding your personal
                information and your right to privacy. If you have any questions
                or concerns about our notice, or our practices with regards to
                your personal information, please contact us at
                contact@cafacemasks.com.
                <br />
                <br />
                In this privacy notice, we seek to explain to you in the
                clearest way possible what information we collect. Please read
                this privacy notice carefully as it will help you make informed
                decisions about sharing your personal information with us.
            </p>
            <h5 className={classes.question}>
                What information do we collect?
            </h5>
            <p>
                We only take information regarding your order and shipping
                information to fulfill your order. Any payment information is
                handled solely by Paypal thus sensitive information is never
                exposed.
            </p>
            <h5 className={classes.question}>
                Will your information be shared with anyone?
            </h5>
            <p>
                We only use information with your consent to comply with laws
                and to provide you with your ordered products.
            </p>
            <h5 className={classes.question}>
                How long do we keep your information?
            </h5>
            <p>
                We keep your information for as long as necessary to fulfill the
                purposes outlined in this privacy notice unless otherwise
                required by law
            </p>
            <h5 className={classes.question}>
                Do we collect information from minors?
            </h5>
            <p>
                We do not knowingly collect data from or market to children
                under 18 years of age.
            </p>

            <h5 className={classes.question}>
                How can you contact us about this policy?
            </h5>
            <p>
                If you have questions or comments about this policy, you may
                email us at contact@cafacemasks.com
            </p>
        </Card>
    );
}

export default Policies;
