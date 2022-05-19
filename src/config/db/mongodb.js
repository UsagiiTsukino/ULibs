const mongoose = require('mongoose')
async function connect() {

    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.mgmax.mongodb.net/ULibs_Database');
        console.log("Connect Successfully");
    } catch (error) {
        console.log("Connect Fallure");
    }
    
}

module.exports = { connect }