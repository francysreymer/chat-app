import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Chat from './components/Chat';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/chat' element={<PrivateRoute/>}>
            <Route exact path='/chat' element={<Chat/>}/>
          </Route>
          <Route exact path='/login' element={<LoginForm/>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;