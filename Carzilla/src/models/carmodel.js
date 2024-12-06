const mongoose = require('mongoose');

// Define the admin schema
const carSchema = new mongoose.Schema({
    car_name:{
        type: String,
        required: true,
        unique: true
    },
    rent_price:{
        type: Number,
        required: true
    },
    car_description:{
        type: String,
        required: true
    }
});

// Create a model based on the schema
const Car = mongoose.model('Cars', carSchema);

// Export the model to use it in other parts of the application
module.exports = Car;