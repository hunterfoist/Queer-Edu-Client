import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {PostInterface} from './PostInterface'


export interface PostLogProps {
    sessionToken: string;
    fetchPosts: Function;
    post: PostInterface;
    posts: PostInterface[];
    editUpdatePost: Function;
    updateOn: Function;
    

}
 
export interface PostLogState {
    open : boolean;
}
 


class PostLog extends React.Component<PostLogProps, PostLogState> {
    constructor(props: PostLogProps) {
        super(props);
        this.state = { open : false };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClickClose = () => {
        this.setState({open: false});
    }

    deletePost = (post: any) => {
        let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('token');
        fetch(`http://localhost:3000/post/deletepost/${post.id}`, {
  method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      })
    })
    .then(() => this.props.fetchPosts())
    }

    render() { 
        return (
        
        <Card style={{ width: '100%' }}>
        <CardActionArea>
          <CardContent>
            <Typography align='center' gutterBottom variant="h5" component="h2">
            {this.props.post.postTitle}
            </Typography>
            
          </CardContent>
        </CardActionArea>
        <CardActions style={{justifyContent: 'center'}}>
        <Button variant='contained' size='small' onClick={() => {this.props.editUpdatePost(this.props.post); this.handleClickOpen() ; this.props.updateOn()}} >Update</Button>
        <Button  variant='contained' size='small'  onClick={() => this.deletePost(this.props.post)}>Delete</Button>
        </CardActions>
      </Card>


      
      );
    }
}
 
export default PostLog;