const codesMap = {
    "10": "enter",
    "13": "enter",
    "32": "space"
};

function charToCode(char) {
    const initialCode = char.charCodeAt();
    let code;

    if (initialCode === 10) {
        code = 13;
    } else {
        code = initialCode;
    }

    const specialCode = codesMap[code];

    if (specialCode) {
        return specialCode;
    } else {
        return char;
    }
}

function fromCharCode(code) {
    const specialChar = codesMap[code];

    if (specialChar) {
        return specialChar;
    } else {
        return String.fromCharCode(code);
    }
}

export default { charToCode, fromCharCode };