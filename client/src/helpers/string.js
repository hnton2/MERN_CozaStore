export const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const stringAvatar = (name, size = { width: 32, height: 32 }) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
            ...size,
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1] ? name.split(" ")[1][0] : ""}`,
    };
};

export const orderTrackingStatus = (status) => {
    switch (status) {
        case "accepted":
            return 1;
        case "processing":
            return 2;
        case "shipped":
            return 3;
        case "delivered":
            return 4;
        case "completed":
            return 5;
        default:
            return 1;
    }
};

export const createSummary = (str, maxLength = 60) => {
    return str.substr(0, maxLength).concat("...");
};
