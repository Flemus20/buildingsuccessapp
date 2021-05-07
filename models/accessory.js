//All of this is boiler plate. If you go on the mongoose docs
//and go under models and then schema, you will see this.

//With schema we are making an object library

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Setting up a blueprint for each cube
const accessorySchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    cubes: [{type: Schema.Types.ObjectId, ref: 'Cube'}]
});

const Accessory = mongoose.model("Accessory", accessorySchema); //model gives us functions that lets 
//talk to the database

module.exports = Accessory;

