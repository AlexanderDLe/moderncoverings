import moment from 'moment-timezone';

export default () => {
    let timestamp = moment().tz('America/Los_Angeles').format().toString();
    const date = timestamp;
    return date;
};
