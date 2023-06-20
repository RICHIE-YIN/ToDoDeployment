const ListController = require('../controllers/list.controller');
const TaskController = require('../controllers/task.controller');

module.exports = function(app) {
// List routes
app.post('/api/createlists', ListController.createList);
app.get('/api/getlists', ListController.getLists);
app.get('/api/getlists/:id', ListController.getList);
app.put('/api/lists/:listId', ListController.updateList);
app.delete('/api/lists/:id', ListController.deleteList);

// Task routes
app.post('/api/lists/:listId/tasks', TaskController.createTask);
app.get('/api/tasks', TaskController.getAllTasks);
app.get('/api/tasks/:id', TaskController.getTaskById);
app.get('/api/lists/:listId/tasks/:taskId', TaskController.getTaskByListId);
app.put('/api/tasks/:taskId', TaskController.updateTask);
app.delete('/api/tasks/:taskId', TaskController.deleteTask);
app.get('/api/tasks/:id/steps', TaskController.getAllSteps);
app.post('/api/tasks/:taskId/steps', TaskController.createStep);
app.put('/api/tasks/:taskId/steps/:stepId', TaskController.updateStep);
app.delete('/api/tasks/:taskId/steps/:stepId', TaskController.deleteStep);
};