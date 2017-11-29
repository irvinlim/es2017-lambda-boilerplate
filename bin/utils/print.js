import colors from 'colors';

colors.setTheme({
    error: 'red',
    success: 'green',
});

const error = msg => {
    console.error(`ERROR: ${msg}`.red);
};

const success = msg => {
    console.log(msg.success);
};

export default {
    error,
    success,
};
