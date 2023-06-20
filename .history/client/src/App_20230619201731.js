import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateList from './views/ListCreate';
import ListDetail from './views/ListDetails';
import Main from './views/Main';
import CreateStep from './views/StepsCreate';
import TaskDetails from './views/TaskDetails';
import CreateTask from './views/TasksCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext';

function App() {
    return (
      <div className="App">
        <UserProvider>
          <Routes>
            <Route element={<Main/>} path="/"/>
            <Route element={<CreateList/>} path="/newlist"/>
            <Route element={<CreateTask/>} path="/newtask/:id"/>
            <Route element={<CreateStep/>} path="/newstep"/>
            <Route element={<ListDetail/>} path="/lists/:listId"/>
            <Route element={<TaskDetails />} path="tasks/:taskId" />
          </Routes>
        </UserProvider>
      </div>
    );
}
export default App;