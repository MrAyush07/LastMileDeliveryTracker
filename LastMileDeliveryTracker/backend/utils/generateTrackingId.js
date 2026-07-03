const generateTrackingId = () => {

    const timestamp = Date.now();

    return `TRK${timestamp}`;

};

module.exports = generateTrackingId;