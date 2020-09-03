import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import TodoHistoryItem from './TodoHistoryItem';

const useStyles = makeStyles({
    root: {
        marginTop: 30,
        width: '100%',
        maxWidth: 900,
        borderBottom: '2px solid #3f51b5',
        padding: 8,
    },
    item: {
        fontSize: '1rem',
    },
});

export default ({ historyArr }) => {
    const classes = useStyles();

    function renderRow(props) {
        const { index } = props;

        let rowBGColor = {
            backgroundColor: index % 2 === 1 ? '#fff' : 'rgb(245,245,245)',
        };

        return (
            <ListItem style={rowBGColor} className={classes.item} key={index}>
                <TodoHistoryItem data={historyArr[index]} index={index} />
            </ListItem>
        );
    }

    return (
        <Card className={classes.root} elevation={3}>
            <FixedSizeList
                className={classes.historyBox}
                height={580}
                width={'100%'}
                itemSize={35}
                itemCount={historyArr ? historyArr.length : 0}
            >
                {renderRow}
            </FixedSizeList>
        </Card>
    );
};
