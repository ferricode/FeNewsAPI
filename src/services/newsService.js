const Publication = require('../models/Publication');

exports.getOne = (publicationId) => Publication.findById(publicationId);
exports.getAll = () => Publication.find();
exports.filterDate = (startDate, endDate) => Publication.find({}).where('publishedAt').gt(startDate).lt(endDate);
exports.filterTitle = (title) => Publication.filter(news => news.title.toLowerCase().includes(title.toLowerCase()));