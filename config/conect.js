const mongoose = require('mongoose');


const Connect = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/db_nodejs');
        console.log('connect successfully!!!')
    } catch (error) {
        console.log('nganh lol !!!')
    }

}

module.exports = { Connect }
