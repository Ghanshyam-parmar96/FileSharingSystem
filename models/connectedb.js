const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then( () => console.log(`mongodb connected`))
.catch( () => console.log( `mongodb not connected`))