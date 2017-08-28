/**
 * Simple utility method to test for Internet connectivity
 * by making a DNS lookup to amazonaws.com.
 * 
 * Useful for ensuring that there is Internet connectivity when
 * using the AWS SDK, which will otherwise result in mysterious AWS 
 * Lambda timeout errors.
 */

const http = require('http');

// Maximum time (in ms) to wait before concluding that we have no Internet connectivity.
const CONNECTION_TIMEOUT = 1000;

module.exports = () => {
    return new Promise(resolve => {
        // Set a timer to timeout.
        const timer = setTimeout(() => resolve(false), CONNECTION_TIMEOUT);

        // Concurrently make a HTTP request to amazonaws.com.
        http.get('http://amazonaws.com/', res => {
            clearTimeout(timer);
            resolve(true);
        });
    });
};
