const Publication = require('../models/Publication');

exports.getOne = (publicationId) => Publication.findById(publicationId);
exports.getAll = () => Publication.find();