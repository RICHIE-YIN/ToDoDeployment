// const List = require('../models/list.model');
// const Task = require('../models/task.model');

// module.exports.createList = function (req, res) {
// const newList = new List({
//     name: req.body.name,
//     tasks: []
// });

// newList.save(function (err, list) {
//     if (err) {
//     res.status(400).json(err);
//     } else {
//     res.json(list);
//     }
// });
// };

// module.exports.getLists = function (req, res) {
// List.find({})
//     .populate('tasks')
//     .exec(function (err, lists) {
//     if (err) {
//         res.status(400).json(err);
//     } else {
//         res.json(lists);
//     }
//     });
// };

// module.exports.getList = function (req, res) {
// List.findById(req.params.id)
//     .populate('tasks')
//     .exec(function (err, list) {
//     if (err) {
//         res.status(400).json(err);
//     } else {
//         res.json(list);
//     }
//     });
// };

// module.exports.updateList = function (req, res) {
// List.findByIdAndUpdate(
//     req.params.id,
//     {
//     $set: {
//         name: req.body.name
//     }
//     },
//     {
//     new: true,
//     useFindAndModify: false
//     },
//     function (err, list) {
//     if (err) {
//         res.status(400).json(err);
//     } else {
//         res.json(list);
//     }
//     }
// );
// };

// module.exports.deleteList = function (req, res) {
// List.findByIdAndDelete(req.params.id, function (err) {
//     if (err) {
//     res.status(400).json(err);
//     } else {
//     res.json({ message: 'List successfully deleted' });
//     }
// });
// };

// module.exports.createTask = function (req, res) {
// const newTask = new Task({
//     name: req.body.name,
//     completed: req.body.completed || false,
//     steps: []
// });

// newTask.save(function (err, task) {
//     if (err) {
//     res.status(400).json(err);
//     } else {
//     List.findByIdAndUpdate(
//         req.params.listId,
//         { $push: { tasks: task._id } },
//         { new: true, useFindAndModify: false },
//         function (err, list) {
//         if (err) {
//             res.status(400).json(err);
//         } else {
//             res.json(task);
//         }
//         }
//     );
//     }
// });
// };

// module.exports.updateTask = function (req, res) {
// Task.findByIdAndUpdate(
//     req.params.taskId,
//     {
//     $set: {
//         name: req.body.name,
//         completed: req.body.completed
//     }
//     },
//     {
//     new: true,
//     useFindAndModify: false
//     },
//     function (err, task) {
//     if (err) {
//         res.status(400).json(err);
//     } else {
//         res.json(task);
//     }
//     }
// );
// };

// module.exports.deleteTask = function (req, res) {
// Task.findByIdAndDelete(req.params.taskId, function (err) {
//     if (err) {
//         res.status(400).json(err);
//     } else {
//         List.findByIdAndUpdate(
//             req.params.listId,
//             { $pull: { tasks: req.params.taskId } },
//             { new: true, useFindAndModify: false },
//             function (err, list) {
//                 if (err) {
//                     res.status(400).json(err);
//                 } else {
//                     res.json({ message: 'Task successfully deleted' });
//                 }
//             }
//         );
//     }
// });
// };

