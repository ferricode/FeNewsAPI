exports.isValidSort = (data) => {

    if ((data) && (data !== 'asc' && data !== 'desc')) {
        return false;
    };
    return true;
};
exports.isValidTitle = (title) => {
    if (/\w{2,30}/.test(title)) {
        return true;
    }
    return false;
};
exports.isValidDate = (date) => {
    if (/^((19|20)[0-9]{2})-(0[1-9]|1[012])-([012][0-9]|3[01])/.test(date)) {
        return true;
    }
    return false;
};

// title = ctx.query.title;
// const from = ctx.query.from;
// const to = ctx.query.to;
// const exactDate = ctx.query.exactDate;