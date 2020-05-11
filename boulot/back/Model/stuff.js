const mongoose = require('mongoose');


const stuffSchema = mongoose.Schema({
    title: {type: String, require: true},
    nb: {type: Number, require: true}
});

module.exports = mongoose.model('stuff', stuffSchema);