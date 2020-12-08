const express = require('express');
const router = express.Router();

// changed to PRODUCT ID/NAME/AUTHOR/AUTHORID/DESCRIPTION (array)...
const sampleJSON = [
    {
        listingId: '',
        listingName: 'Chair',
        listingAuthor: 'Harry',
        listingAuthorId: '',
        description: [{
            name: '',
            location: '',
        }]
    }
];

router.get('/', (req, res) => res.send(sampleJSON));

module.exports = router;