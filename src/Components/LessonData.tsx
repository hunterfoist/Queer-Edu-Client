import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LessonLog from './LessonLog';

import LessonCreate from './LessonCreate';



export interface LessonDataProps {
    
    sessionToken: string;
    
}
 
export interface LessonDataState {
    lessons: LessonLog[];
    updateActive: boolean;
    lessonToUpdate: {};
}



class LessonData extends React.Component<LessonDataProps, LessonDataState> {
    constructor(props: LessonDataProps) {
        super(props);
        this.state = { 
            lessons: {
                lessonName: "",
                lessonDescription: "",
                fileUpload: ""
            },
            updateActive: false,
            lessonToUpdate: {}
        }

    }

    fetchLessons() {

        fetch('http://localhost:3000/lesson/getmylessons', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('sessionToken')}`
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


componentDidMount = () => {
    this.fetchLessons();
}

displayCards() {
    return this.state.lessons.length > 0 ? this.state.lessons.map((lesson) => <LessonLog lesson={lesson} lessons={this.state.lessons} editUpdateLesson={this.editUpdateLesson} updateOn={this.updateOn} fetchLessons={this.fetchLessons} sessionToken={this.props.sessionToken} />) : null;
}
    render() { 
        return (
        <Container>
        <Grid container xs={12}>
           <Grid>
             <LessonCreate fetchLessons={this.fetchLessons} sessionToken={this.props.sessionToken} />
           </Grid>
           <Grid container item xs={9} alignItems="flex-start">
          {this.displayCards()}
          </Grid>
           </Grid>
   
       </Container>);
    }
}
 
export default LessonData;