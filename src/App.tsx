import React, {useState } from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./Auth/Auth";

import Header from "./Components/Header";

import PostData from './Components/PostData'

import LessonData from './Components/LessonData'

function App() {

  const [sessionToken, setSessionToken] = useState('');

  const updateToken = (newToken: any) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  return (
    <Router>
      <div className="App">
        <Header />
  
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/'><Auth updateToken={updateToken} /></Route> 
              <Route path="/create-post" component={PostData} />
              <Route path="/create-lesson" component={LessonData}/>
            </Switch>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;
