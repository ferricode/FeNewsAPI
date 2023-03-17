exports.isValidSort = (data) => {

    if ((data) && (data !== 'asc' && data !== 'desc')) {
        return false;
    };
    return true;
};
exports.isValidTitle = (title) => {
    if ((title) && !(/\w{3,30}/.test(title))) {
        return false;
    }
    return true;
};
exports.isValidDate = (date) => {
    if ((date) && !(/^((19|20)[0-9]{2})-(0[1-9]|1[012])-([012][0-9]|3[01])/.test(date))) {
        return false;
    }
    return true;
};
exports.isValidExactDate = (query) => {
    if ((query.from && query.exactDate) || (query.exactDate && query.to)) {
        return false;
    }
    return true;

};