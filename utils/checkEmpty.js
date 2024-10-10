const validator = require("validator");

exports.checkEmpty = (config) => {
    let isError = false;
    let error = [];

    for (const key in config) {
        const value = config[key];

        // Check if value is a string
        if (typeof value === 'string') {
            if (validator.isEmpty(value)) {
                isError = true;
                error.push(`${key} is required`);
            }
        }

        // Check if value is a number
        else if (typeof value === 'number') {
            // Check if the number is null, undefined, or NaN
            if (value === null || value === undefined || isNaN(value)) {
                isError = true;
                error.push(`${key} is required`);
            }
        }

        // Handle any other types, if needed (like boolean, array, etc.)
        else if (!value) {
            isError = true;
            error.push(`${key} is required`);
        }
    }

    return { isError, error };
};
