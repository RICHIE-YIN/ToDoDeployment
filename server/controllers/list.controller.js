const List = require('../models/list.model');

module.exports.createList = (req, res) => {
    const newList = req.body
    List.create(newList)
    .then((list) => res.json(list))
    .catch((err) => res.json(err)); 
}

module.exports.getLists = function (req, res) {
    List.find({})
    .populate('tasks')
    .then(lists => {
        res.json(lists);
    })
    .catch(err => {
        res.status(400).json(err);
    });
};

module.exports.getList = function (req, res) {
    List.findById(req.params.id)
    .populate('tasks')
    .then(list => {
        res.json(list);
    })
    .catch(err => {
        res.status(400).json(err);
    });
};

module.exports.updateList = function (req, res) {
    const idFromParams = req.params.listId
    const updatedValue = req.body
    List.findOneAndUpdate({_id: idFromParams}, updatedValue, {new: true, useFindAndModify: false})
    .then((updatedList) => res.json(updatedList))
    .catch ((err) => res.status(400).json(err))
}

module.exports.deleteList = function (request, response) {
    List.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
