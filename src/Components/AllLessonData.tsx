import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AllLessonLog from './AllLessonLog';


import {LessonInterface} from './LessonInterfaces'



export interface LessonDataProps {
    
    sessionToken: string;
    
}
 
export interface LessonDataState {
    lessons: LessonInterface[];
    updateActive: boolean;
    lessonToUpdate: {};
}



class LessonData extends React.Component<LessonDataProps, LessonDataState> {
    constructor(props: LessonDataProps) {
        super(props);
        this.state = { 
            lessons: [{
                lessonName: "",
                lessonDescription: "",
                fileUpload: "",
                id: 1
            }],
            updateActive: false,
            lessonToUpdate: {}
        }

    }

    fetchLessons() {

        fetch('http://localhost:3000/lesson/getalllessons', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      })
    })
    .then(response => response.json())
    .then((lessonData) => {
      this.setState({lessons: lessonData});
    });
  }
    editUpdateLesson = (lesson: number) => {
    this.setState({lessonToUpdate: lesson});
    console.log(lesson);
  };

  updateOn = () => this.setState({updateActive: true});
  updateOff = () => this.setState({updateActive: false});


componentDidMount = () => {
    this.fetchLessons();
}



displayCards() {
    return this.state.lessons.length > 0 ? this.state.lessons.map((lesson) => <AllLessonLog lesson={lesson} lessons={this.state.lessons}  fetchLessons={this.fetchLessons.bind(this)} sessionToken={this.props.sessionToken} />) : null;
}
    render() { 
        return (
        <Container>
         
        <Grid container xs={12}>
           <Grid>
             
           </Grid>
           <Grid container item xs={9} alignItems="flex-start">
          {this.displayCards()}
          
          </Grid>
           </Grid>
   
       </Container>);
    }
}
 
export default LessonData;