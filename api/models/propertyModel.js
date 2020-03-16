'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    city: {
        type: String
    },
    country: {
        type: String
    },
    countryCode: {
        type: String
    },
    estMaxPrice: {
        type: Number
    },
    estMinPrice: {
        type: Number
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
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
    postalcode: {
        type: String,
    },
    salesforceId: {
        type: String,
        required: true
    },
    soldPrice: {
        type: Number
    },
    state: {
        type: String,
    },
    street: {
        type: String,
    },
    suburb: {
        type: String,
    },
    uuid: {
        type: String,
        required: true
    }
});

// this Properties will be the collection name in MongoDB
module.exports = mongoose.model('Properties', PropertySchema);