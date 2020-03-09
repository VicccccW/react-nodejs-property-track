'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    estMaxPrice: {
        type: Number
    },
    estMinPrice: {
        type: Number
    },
    hasSold: {
        type: Boolean
    },
    landSize: {
        type: Number
    },
    mainImageUrl: {
        type: String
    },
    name: {
        type: String,
    },
    noOfBathrooms: {
        type: Number
    },
    noOfRooms: {
        type: Number
    },
    salesforceId: {
        type: String,
        required: true
    },
    soldPrice: {
        type: Number
    },
    uuid: {
        type: String,
        required: true
    }
});

// this Properties will be the collection name in MongoDB
module.exports = mongoose.model('Properties', PropertySchema);