import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { FAQStyles } from './FAQStyles';

const FAQ = () => {
    const styles = FAQStyles();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Card className={styles.root} elevation={1}>
            <h2 className={styles.Raleway}>Frequently Asked Questions</h2>
            <hr />
            <h5 className={styles.question}>How are these masks made?</h5>
            <p>
                There are 4 layers of different materials that work together to
                help cover your face from particles in the air. These materials
                include tightly-woven cotton and a non-woven rayon & polyester
                blend.
                <br />
                <br />
            </p>
            <h5 className={styles.question}>Are these masks washable?</h5>
            <p>
                Yes, we recommend washing with cold water & soap then hanging to
                air dry. Avoid using hot water or a dryer as the prolonged heat
                may shrink certain fabric. You may use an iron to smoothen any
                following wrinkles.
            </p>
            <h5 className={styles.question}>How much do these masks cost?</h5>
            <p>
                Each mask is currently priced at $12.50 each with absolutely
                free shipping in the US.
            </p>
            <h5 className={styles.question}>Is there a discount available?</h5>
            <p>
                Yes, there is a 15% discount for $45+ subtotal orders. Simply
                use code 15OFF in the cart to apply.
            </p>
            <h5 className={styles.question}>How long will delivery take?</h5>
            <p>Delivery will typically be within 5-9 business days.</p>
            <h5 className={styles.question}>
                Do these masks come with elastic? How long are they?
            </h5>
            <p>
                Yes, each mask comes with two elastic bands - one for looping
                around each ear. Each of the bands are 10 inches in length.
            </p>
            <h5 className={styles.question}>
                Are the elastic bands adjustable?
            </h5>
            <p>
                Yes, each elastic band comes with a plastic adjuster that you
                can use to adjust for a comfortable fit!
            </p>

            <h5 className={styles.question}>Is there a nosepiece?</h5>
            <p>
                Yes, each mask comes with an adjustable/bendable metal nose wire
                that you can use to adjust for a comfortable fit.
            </p>

            <h5 className={styles.question}>Where are these masks made?</h5>
            <p>
                All masks are produced and shipped from Anaheim, California,
                USA.
            </p>

            <h5 className={styles.question}>
                How do you know what size to get?
            </h5>
            <p>
                There are size dimensions (Width x Height in inches) available
                on each product page. Select a size that would best suit you.
            </p>
            <h5 className={styles.question}>Do they have a filter pocket?</h5>
            <p>
                No, these masks do not have filter pockets - but they are
                resusable by proper washing.
            </p>
            <h5 className={styles.question}>How many designs do you have?</h5>
            <p>
                We have over 100 designs and counting. We're constantly
                increasing our options so you may find what you like! On the
                flip side, certain popular designs may eventually run out and
                become unavailable so get them while you can!
            </p>
            <h5 className={styles.question}>
                How can I get in contact with you?
            </h5>
            <p>
                If you wish to get in touch, you can send an email to
                contact@moderncoverings.com.
            </p>
            <div className={styles.buttonDiv}>
                <Link
                    to="/selection/masks"
                    className={styles.viewSelectionButton}
                >
                    <Button variant="contained" color="primary" size="medium">
                        View Selection
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default FAQ;
