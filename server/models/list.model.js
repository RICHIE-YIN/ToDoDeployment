const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
title: {
    type: String,
    required: [true, "hreuodkvhjdkivrfhkuredgyhv"]
},
tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
}],
completed: {
    type: Boolean,
    default: false
}
});

module.exports = mongoose.model('List', ListSchema);