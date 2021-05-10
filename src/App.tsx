import React from 'react';
import './App.css';




import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "./Auth/Auth";

import Header from "./Components/Header";

import PostData from './Components/PostData'
import AllPostData from './Components/AllPostData'
import LessonData from './Components/LessonData'
import AllLessonData from './Components/AllLessonData'
import SplashNav from './Components/SplashNav';



export interface AppProps{

}
export interface AppState {
  sessionToken: string,
  teacherOrStudent: string,
  json: string,
  results: []

}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps){
    super(props);

    this.state = {sessionToken: '', teacherOrStudent: '', json: '', results: []}
  }

  // componentDidMount(){
  //   if (localStorage.getItem('token')){
  //     // this.state.sessionToken(localStorage.getItem('token'));
  //      const localStoredToken = localStorage.getItem('token')
  //      console.log(localStoredToken.sessionToken)
  //     this.setState({sessionToken: localStoredToken.sessionToken})
  //   }
  // }

  updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    console.log(newToken);
    this.setState({
      sessionToken: newToken
      });
    
  }

  updateTeacherOrStudent = (newTeacherOrStudent: string) => {
    localStorage.setItem('teacherOrStudent', newTeacherOrStudent);
    console.log(newTeacherOrStudent);
    this.setState({
      teacherOrStudent: newTeacherOrStudent
    })
  }
  

  protectedViews = () => {
    return ( localStorage.getItem('teacherOrStudent') ? <Auth updateToken={this.updateToken} updateTeacherOrStudent={this.updateTeacherOrStudent}/>
    : <Auth updateToken={this.updateToken} updateTeacherOrStudent={this.updateTeacherOrStudent}/>)
  }

  protectedNav = () => {
    return ( localStorage.getItem('teacherOrStudent') ? <Header />
    : <SplashNav/>)
  }

  componentDidMount(){
    let sessionToken = localStorage.getItem('token')
    let teacherOrStudent = localStorage.getItem('teacherOrStudent')

    if (sessionToken){
      this.setState({sessionToken: sessionToken})
    }
    if (teacherOrStudent){
      this.setState({
        teacherOrStudent: teacherOrStudent
      })
    }
  }

  render(){
  return (
    <div className='App'>
      <Router>
      
      {this.protectedNav()}
      <Switch>
      <Route exact path='/home'>{this.protectedViews()}</Route>
      <Route path="/create-post" component={PostData} />
      <Route path="/create-lesson" component={LessonData}/>
      <Route path="/all-posts" component={AllPostData}/>
      <Route path="/all-lessons" component={AllLessonData}/>
      </Switch>
      </Router>
      
  <br/>
  <br/>
  </div>
      
  );
}
}
export default App;




