const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
completed: {
    type: Boolean,
    default: false
}
});

const TaskSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
description: {
    type: String
},
steps: [StepSchema],
completed: {
    type: Boolean,
    default: false
}
});

module.exports = mongoose.model('Task', TaskSchema);