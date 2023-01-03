const mongoose = require('mongoose');


const dbConnection = async (username, password) => {

    const URL = `mongodb+srv://${username}:${password}@cluster0.ejjvkon.mongodb.net/workout-app`;

    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("error while connection with the database", error);
    }

}

module.exports = dbConnection