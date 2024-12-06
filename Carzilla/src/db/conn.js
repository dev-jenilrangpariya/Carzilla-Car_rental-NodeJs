const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/carzilla_main", {
    
}).then(() => {
    console.log("Your Database is Connected Successfuliy");
}).catch((e) => {
    console.log("Not Connected");
}); 