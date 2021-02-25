import moment from 'moment-timezone';

const timestamper = () => {
    let timestamp = moment().tz('America/Los_Angeles').format().toString();
    const date = timestamp;
    return date;
};

export default timestamper;
