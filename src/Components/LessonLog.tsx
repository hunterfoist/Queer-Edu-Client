import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




export interface LessonLogProps {
    sessionToken: string;
    fetchLessons: Function;
    lesson: LessonLog;
    lessons: LessonLog[];
    editUpdateLesson: Function;
    updateOn: Function;
    

}
 
export interface LessonLogState {
    open : boolean;
}
 


class LessonLog extends React.Component<LessonLogProps, LessonLogState> {
    constructor(props: LessonLogProps) {
        super(props);
        this.state = { open : false };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClickClose = () => {
        this.setState({open: false});
    }

    deleteLesson = (lesson: any) => {
        let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('sessionToken');
        fetch(`http://localhost:3000/lesson/deletelesson/${lesson.id}`, {
  method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      })
    })
    .then(() => this.props.fetchLessons())
    }

    render() { 
        return (
        
        <Card style={{ width: '100%' }}>
        <CardActionArea>
          <CardContent>
            <Typography align='center' gutterBottom variant="h5" component="h2">
            {this.props.lesson.lessonName}
            </Typography>
            
          </CardContent>
        </CardActionArea>
        <CardActions style={{justifyContent: 'center'}}>
        <Button variant='contained' size='small' onClick={() => {this.props.editUpdateLesson(this.props.lesson); this.handleClickOpen() ; this.props.updateOn()}} >Update</Button>
        <Button  variant='contained' size='small'  onClick={() => this.deleteLesson(this.props.lesson)}>Delete</Button>
        </CardActions>
      </Card>


      
      );
    }
}
 
export default LessonLog;