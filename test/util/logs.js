import stripAnsi from 'strip-ansi';

// Define which system logs to strip out when parsing stderr from docker-lambda.
const BLACKLISTED_GREPS = [
    /^START RequestId: /,
    /^END RequestId: /,
    /^REPORT RequestId: /,
];

// Define the spliterator for syslog headers.
const SYSLOG_HEADER_GREP = /\n?\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\t[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\t/;

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
        .join('\n')
        .split(SYSLOG_HEADER_GREP)
        .filter(x => x && x.length);
}

/**
 * Formats a list of console.log() message to be displayed in
 * the test runner.
 *
 * @param {string[]} messages Messages to be displayed.
 * @returns {string} Formatted console messages.
 */
function formatLogForConsole(messages) {
    const lines = [
        '\u001b[1;33mCaptured logs while executing Lambda function:\u001b[0m',
        ...messages,
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
    formatLogForConsole,
    formatLogForError,
};
