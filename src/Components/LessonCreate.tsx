import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';


export interface CreateLessonProps {
    
    sessionToken: string;
    fetchLessons: Function;
    
}
 
export interface CreateLessonState {
    lessonName: string;
    lessonDescription: string;
    fileUpload: string;
    
}
 




class CreateLesson extends React.Component<CreateLessonProps, CreateLessonState> {
    constructor(props: CreateLessonProps) {
        super(props);
        this.state = {
            lessonName: "",
            lessonDescription: "",
            fileUpload: ""
        }

        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   


        handleSubmit = (event: any) => {
          let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('token');
    
            event.preventDefault();
            fetch('http://localhost:3000/lesson/createlesson', {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token ? token : ''
              }),
              body: JSON.stringify({ lesson: { lessonName: this.state.lessonName, lessonDescription: this.state.lessonDescription, fileUpload: this.state.fileUpload } })
            })
            .then(response => response.json())
            .then(lessonData => {
              console.table(lessonData);
              this.setState({ lessonName: ''});
              this.setState({ lessonDescription: ''});
              this.setState({ fileUpload: ''});
              // this.props.fetchLessons();
            })
          }

    render() { 
      console.log(this.props.sessionToken)
        return ( 
            <Container>
            <br/>
            <br/>
            <br/>
            <h1>Create a Lesson!</h1>
            <br/>
            <h2>Below, please name, describe, and provide a shared link to a queer-focused lesson you love to use!</h2>
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="Lesson Name"
                        name="lessonName"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => this.setState({lessonName: e.target.value})}
                        value={this.state.lessonName}
                        id="lessonName"
                        label="Lesson Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lessonDescription"
                        label="Lesson Description"
                        onChange={(e) => this.setState({lessonDescription: e.target.value})}
                        value={this.state.lessonDescription}
                        name="lessonDescription"
                        autoComplete="Lesson Description"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="fileUpload"
                        label="Google Drive Link"
                        onChange={(e) => this.setState({fileUpload: e.target.value})}
                        value={this.state.fileUpload}
                        name="fileUpload"
                        autoComplete="Please insert a link to a Google Drive Document"
                      />
                    </Grid>
                    
                    
                  </Grid>
                  <br/>
                  <Grid>
                  <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    fullWidth
                    variant="contained"
                  >
                    Create Lesson!
                  </Button >
                  </Grid>
            </Container>
         );
    }
}
 
export default CreateLesson;

