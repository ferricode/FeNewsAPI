const mongoose = require('mongoose');


//TODO correct validations
const publicationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
        required: true,
    },
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;