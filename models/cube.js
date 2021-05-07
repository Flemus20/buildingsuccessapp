//All of this is boiler plate. If you go on the mongoose docs
//and go under models and then schema, you will see this.

//With schema we are making an object library

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Setting up a blueprint for each accessory
const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficulty: Number,
    accessories: [{type: Schema.Types.ObjectId, ref: 'Accessory'}]
});

const Cube = mongoose.model("Cube", cubeSchema); //model gives us functions that lets 
//talk to the database

module.exports = Cube;

