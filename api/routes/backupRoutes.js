'use strict';

const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel');

//if touch this point, we mean Salesforce has prepared data structure (json format) 
//and wants to back up these data in MongoDB
router.post('/', async (req, res) => {
    console.log("request in backup put ");

    try {
        //after get request 
        //prepare Property.bulkWrite data structure, by if the record has _id/MongoDB_Id
        //if has, use updateOne
        //if null, use insert One
        //if salesforce field value is null, it will not sent to us, so we need to check if the field exist first
        const bulkWriteDataModel = convertData(req.body);

        if(bulkWriteDataModel == null) {
            res.json('No data to backcup. Exit');
        }

        console.log(bulkWriteDataModel);

        const backupProperties = await Property.bulkWrite(
            bulkWriteDataModel
        );
        
        res.status(200).send(backupProperties);
    } catch(err) {
        res.status(400).send(err);
    }
});

function convertData(requestBody) {
    if(requestBody.properties == null || requestBody.properties.length == 0) {
        return null;
    } 

    // we want to generate an array that is compatiable with Property.bulkWrite() updateOne
    return requestBody.properties
    .filter(el => {
        if(el.UUID__c != null) {
            return el;
        }
    })
    .map(el => buildUpsertOneStructure(el));
}

//function to return an object with Mongoose UpdateOne structure
function buildUpsertOneStructure(property) {
    const structure = {
        updateOne: {
            filter: {},
            update: {},
            upsert: true
        }
    };

    structure.updateOne.filter.uuid = property.UUID__c;

    if(property.City__c != undefined) {
        structure.updateOne.update.city = property.City__c;
    };

    if(property.Country__c != undefined) {
        structure.updateOne.update.country = property.Country__c;
    };

    if(property.CountryCode__c != undefined) {
        structure.updateOne.update.countryCode = property.CountryCode__c;
    };

    if(property.Est_Max_Price__c != undefined) {
        structure.updateOne.update.estMaxPrice = property.Est_Max_Price__c;
    };

    if(property.Est_Min_Price__c != undefined) {
        structure.updateOne.update.estMinPrice = property.Est_Min_Price__c;
    };

    if(property.Geolocation__Latitude__s != undefined) {
        structure.updateOne.update.latitude = property.Geolocation__Latitude__s;
    };

    if(property.Geolocation__Longitude__s != undefined) {
        structure.updateOne.update.longitude = property.Geolocation__Longitude__s;
    };

    if(property.Has_Sold__c != undefined) {
        structure.updateOne.update.hasSold = property.Has_Sold__c;
    }; 

    if(property.Land_Size__c != undefined) {
        structure.updateOne.update.landSize = property.Land_Size__c;
    };

    if(property.Main_Image_URL__c != undefined) {
        structure.updateOne.update.mainImageUrl = property.Main_Image_URL__c;
    };

    if(property.Name__c != undefined) {
        structure.updateOne.update.name = property.Name__c;
    }; 

    if(property.No_of_Bathrooms__c != undefined) {
        structure.updateOne.update.noOfBathrooms = property.No_of_Bathrooms__c;
    };

    if(property.No_of_Rooms__c != undefined) {
        structure.updateOne.update.noOfRooms = property.No_of_Rooms__c;
    }; 

    if(property.Postalcode__c != undefined) {
        structure.updateOne.update.postalcode = property.Postalcode__c;
    };

    // we assume the Salesforce Id field will to be sent anyway
    structure.updateOne.update.salesforceId = property.Id;
    
    if(property.Sold_Price__c != undefined) {
        structure.updateOne.update.soldPrice = property.Sold_Price__c;
    }; 

    if(property.State__c != undefined) {
        structure.updateOne.update.state = property.State__c;
    };

    if(property.Street__c != undefined) {
        structure.updateOne.update.street = property.Street__c;
    };

    if(property.Suburb__c != undefined) {
        structure.updateOne.update.suburb = property.Suburb__c;
    };

    structure.updateOne.update.uuid = property.UUID__c;

    return structure;
}

module.exports = router;