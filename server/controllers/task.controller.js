const Task = require('../models/task.model');
const List = require('../models/list.model');

module.exports.createTask = (req, res) => {
    const newListTask = req.body;
    const listId = req.params.listId;
    
    Task.create(newListTask)
    .then((task) => {
        // Update the tasks array of the corresponding list document
        return List.findOneAndUpdate(
            { _id: listId },
            { $push: { tasks: task._id } },
            { new: true }
        );
    })
    .then((list) => {
        res.json(list);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
    
};

module.exports.getAllTasks = (req, res) => {
    Task.find({})
    .then(tasks => {
        res.json(tasks);
    })
    .catch(err => {
        res.status(400).json(err);
    });
};

module.exports.getTaskById = (req, res) => {
    const taskId = req.params.id;
    const listId = req.params.listId;
    Task.findOne({_id: taskId, list: listId})
        .then((task) => {
            res.json(task);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};




module.exports.getTaskByListId = (req, res) => {
    const listId = req.params.listId;
    const taskId = req.params.taskId;

    Task.findOne({ _id: taskId, list: listId })
    .then((task) => {
        if (!task) {
        return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.updateTask = (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    Task.findByIdAndUpdate(taskId, updatedTask, {new: true})
    .then((task) => {
        res.json(task);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;
    Task.findByIdAndDelete(taskId)
    .then(() => {
        res.json({ message: 'Task successfully deleted' });
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.createStep = (req, res) => {
    const taskId = req.params.taskId;
    const newStep = req.body;
    Task.findByIdAndUpdate(taskId, {$push: {steps: newStep}}, {new: true})
    .then((task) => {
        res.json(task);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.updateStep = (req, res) => {
    const taskId = req.params.taskId;
    const stepId = req.params.stepId;
    const { completed } = req.body;

    Task.findOneAndUpdate(
    { _id: taskId, "steps._id": stepId },
    { $set: { "steps.$.completed": completed } },
    { new: true }
    )
    .then((task) => {
        res.json(task);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.deleteStep = (req, res) => {
    const { taskId, stepId } = req.params;
    Task.findByIdAndUpdate(taskId, { $pull: { steps: { _id: stepId } } }, { new: true })
    .then((task) => {
        res.json(task);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.getAllSteps = (req, res) => {
    const taskId = req.params.taskId;

    Task.findById(taskId)
    .then((task) => {
        res.json(task.steps);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};
