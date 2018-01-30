import stripAnsi from 'strip-ansi';

// Define which system logs to strip out when parsing stderr from docker-lambda.
const BLACKLISTED_GREPS = [
    /^START RequestId: /,
    /^END RequestId: /,
    /^REPORT RequestId: /,
];

/**
 * Returns an array of lines that were logged using console.log()
 * within an invocation of AWS Lambda, extracted from the system log.
 *
 * @param {string} stderr Raw log from AWS Lambda.
 * @returns {array} Array of lines that were logged to the console.
 */
function getSysLogLines(stderr) {
    return stderr
        .trim()
        .split('\n')
        .map(stripAnsi)
        .filter(line => BLACKLISTED_GREPS.every(grep => !grep.test(line)))
        .map(removeSysLogHeaders);
}

/**
 * Strips headers from a line of raw system logs from AWS Lambda.
 * This removes the timestamp and the request ID, which are delimited
 * by tabs.
 *
 * @param {string} logLine Raw stderr system log line.
 * @returns {string} Log line without timestamps and request IDs.
 */
function removeSysLogHeaders(logLine) {
    return logLine
        .split('\t')
        .slice(2)
        .join('\t');
}

/**
 * Formats a list of console.log() message to be displayed in
 * the test runner.
 *
 * @param {string[]} messages Messages to be displayed.
 * @returns {string} Formatted console messages.
 */
function formatLogForConsole(message) {
    const lines = [
        '\u001b[1;33mCaptured logs while executing Lambda function:\u001b[0m',
        message,
    ];

    return lines.join('\n\n');
}

/**
 * Formats an error message to be displayed in the test runner
 * when the Lambda invocation encounters an error.
 *
 * @param {string} message Error message to be displayed.
 * @param {string} stderr AWS system log redirected from stderr.
 * @returns {string} Formatted error message.
 */
function formatLogForError(message, stderr) {
    const lines = [
        '\u001b[1;31mError while executing Lambda function:\u001b[0m',
        message + '\n',
        '\u001b[1;33mDisplaying AWS Lambda system log:\u001b[0m',
        stripAnsi(stderr),
    ];

    return lines.join('\n');
}

module.exports = {
    getSysLogLines,
    removeSysLogHeaders,
    formatLogForConsole,
    formatLogForError,
};
