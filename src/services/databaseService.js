const Publication = require('../models/Publication');
const path = require('path');
const initDatabase = require('../config/databaseInit');
const fs = require('fs');


async function seedDbFromJson() {
    initDatabase();

    const jsonData = fs.readFileSync(path.join(__dirname, '../data/db.json'), 'utf8');
    const publications = JSON.parse(jsonData);

    async function savePublication(publication) {

        const newPublication = new Publication({
            title: publication.title,
            content: publication.content,
            description: publication.description,
            publishedAt: new Date(publication.publishedAt)
        });

        try {
            await newPublication.save();
            console.log('Saved new publication:', newPublication);
        } catch (err) {
            console.error(err);
        }
    }

    async function savePublications() {
        for (const publication of publications) {
            await savePublication(publication);
        }
    }

    savePublications();
};
module.exports = seedDbFromJson;