import moment from 'moment-timezone';

export default () => {
    const timestamp = moment().tz('America/Los_Angeles').format().toString();
    const date = moment(timestamp.slice(0, 10));
    const dow = date.day();

    const labels = {
        0: '5ebdcdfa50359740d35f8bf1',
        1: '5eb0d04b526baa3fdb30aedd',
        2: '5eb0d025cc223e226dc80988',
        3: '5eaf0c1c7669b22549987151',
        4: '5eaf0c1c7669b22549987154',
        5: '5eaf0c1c7669b22549987155',
        6: '5eaf0c1c7669b22549987156',
    };
    return [labels[dow]];
};
